import React from "react";
import type { City, ClockSettings } from "../types";
import { getCityTime } from "../utils/getCityTime";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import "./CityCard.css";

interface CityCardProps {
  city: City;
  currentTime: Date;
  clockSettings: ClockSettings;
  onDelete?: (id: number) => void;
  isDefault?: boolean;
}

const CityCard: React.FC<CityCardProps> = ({
  city,
  currentTime,
  clockSettings,
  onDelete,
  isDefault,
}) => {
  // Class for styling (default vs API city)
  const cardClass = isDefault ? "city-card default" : "city-card api-city";

  // Style variable for background image on default cards
  const cardStyle =
    isDefault && city.image
      ? ({ "--bg-image": `url(${city.image})` } as React.CSSProperties)
      : {};

  // --- Convert current time to city timezone for analog clock ---
  const getCityDate = (date: Date, timeZone: string): Date => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const parts = formatter.formatToParts(date);
    const values: Record<string, number> = {};

    parts.forEach((p) => {
      if (p.type !== "literal") values[p.type] = parseInt(p.value, 10);
    });

    return new Date(
      values.year,
      (values.month ?? 1) - 1,
      values.day ?? 1,
      values.hour ?? 0,
      values.minute ?? 0,
      values.second ?? 0
    );
  };

  const cityDate = getCityDate(currentTime, city.timezone);

  return (
    <div className={cardClass} style={cardStyle}>
      <div className="text-overlay">
        <h2>{city.name}</h2>
        <p>
          {/* Digital clock */}
          <span className="time-text">
            {getCityTime(currentTime, city.timezone, clockSettings)}
          </span>
        </p>

        {/* Analog clock */}
        <div className="analog-clock">
          <Clock value={cityDate} size={120} renderNumbers={true} />
        </div>
      </div>

      {onDelete && <button onClick={() => onDelete(city.id)}>Delete</button>}
    </div>
  );
};

export default CityCard;
