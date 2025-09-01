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
 const bgStyle = {
  background: isDefault && city.image
    ? `url(${city.image}) center/cover no-repeat`
    : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  };

  return (
    <div style={bgStyle}>
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