import { useState, type ChangeEvent } from "react";
import axios from "axios";
import type { City, ClockSettings } from "../types";
import { useCurrentTime } from "../hooks/useCurrentTime";
// import { getCityTime } from "../utils/getCityTime";
import { defaultCities } from "../constants/defaultCities";
import { useCity } from "../hooks/useCity";
import CityCard from "./CityCard";

export default function CityList() {
  const { cities, addCity, removeCity } = useCity(); // use context
  const [newCityName, setNewCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const currentTime = useCurrentTime();

  const clockSettings: ClockSettings = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCityName(e.target.value);
  };

  const getCityTimezone = async (cityName: string): Promise<City | null> => {
    try {
      setLoading(true);

      // Get coordinates from OpenStreetMap
      const geoRes = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: { q: cityName.trim(), format: "json", limit: 1 },
      });
      const cityData = geoRes.data[0];
      if (!cityData) return null;

      const { lat, lon, display_name } = cityData;

      // Get timezone from TimeZoneDB
      const tzRes = await axios.get("https://api.timezonedb.com/v2.1/get-time-zone", {
        params: {
          key: import.meta.env.VITE_TIMEZONEDB_KEY,
          format: "json",
          by: "position",
          lat,
          lng: lon,
        },
      });

      const timezone = tzRes.data.zoneName;
      if (!timezone) return null;

      return {
        id: Date.now(),
        name: display_name.split(",")[0],
        timezone,
        country: display_name.split(",").slice(-1)[0],
      };
    } catch (error) {
      console.error("Error fetching city timezone:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleAddCity = async () => {
    if (!newCityName.trim()) return;

    const cityInfo = await getCityTimezone(newCityName);
    if (cityInfo) addCity(cityInfo); // add via context
    else alert("City not found!");

    setNewCityName("");
  };

  return (
    <section>
      <h1>City List</h1>

      <input
        type="text"
        value={newCityName}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      <button onClick={handleAddCity} disabled={loading}>
        {loading ? "Adding..." : "Add City"}
      </button>

      <div className="city-list">
        {/* Default cities */}
        {defaultCities.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            currentTime={currentTime}
            clockSettings={clockSettings}
            isDefault={true} // uses city.image
          />
        ))}

        {/* User-added cities */}
        {cities.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            currentTime={currentTime}
            clockSettings={clockSettings}
            onDelete={removeCity} // delete function
            isDefault={false} // shows gradient
          />
        ))}
      </div>
    </section>
  );
}