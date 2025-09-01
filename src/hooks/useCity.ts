import { useContext } from "react";
import { CityContext } from "../components/CityContext";

export function useCity() {
  const context = useContext(CityContext);
  if (!context) throw new Error("useCity must be used within a CityProvider");
  return context;
}