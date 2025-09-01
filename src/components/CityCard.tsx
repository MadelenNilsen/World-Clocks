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
  // Use specific image if default city, otherwise gradient
  const bgStyle = {
    background: isDefault && city.image
      ? `url(${city.image}) center/cover no-repeat`
      : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    padding: "1rem",
    borderRadius: "10px",
    color: "white",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div style={bgStyle}>
      <div>
        <h2>{city.name}</h2>
        <p>{getCityTime(currentTime, city.timezone, clockSettings)}</p>
      </div>
      {onDelete && <button onClick={() => onDelete(city.id)}>Delete</button>}
    </div>
  );
};

export default CityCard;