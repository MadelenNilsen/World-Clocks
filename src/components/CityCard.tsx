import React from "react";
import type { City, ClockSettings } from "../types";
import { getCityTime } from "../utils/getCityTime";
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
  // Assign class based on default or API-added city
  const cardClass = isDefault ? "city-card default" : "city-card api-city";

  // For default cities with images, pass the image via CSS variable
  const cardStyle =
    isDefault && city.image
      ? { "--bg-image": `url(${city.image})` } as React.CSSProperties
      : {};

  return (
    <div className={cardClass} style={cardStyle}>
      <div className="text-overlay">
        <h2>{city.name}</h2>
        <p>
          <span className="time-text">
            {getCityTime(currentTime, city.timezone, clockSettings)}
          </span>
        </p>
      </div>
      {onDelete && <button onClick={() => onDelete(city.id)}>Delete</button>}
    </div>
  );
};

export default CityCard;
