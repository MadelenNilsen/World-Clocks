import { createContext } from "react";
import type { City } from "../types";

export interface CityContextType {
  cities: City[];
  addCity: (city: City) => void;
  removeCity: (id: number) => void;
}

export const CityContext = createContext<CityContextType | undefined>(undefined);