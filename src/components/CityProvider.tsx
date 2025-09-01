import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CityContext } from "./CityContext";
import type { City } from "../types";

interface Props {
  children: ReactNode;
}

export function CityProvider({ children }: Props) {
  const [cities, setCities] = useState<City[]>(() => {
    const saved = localStorage.getItem("userCities");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("userCities", JSON.stringify(cities));
  }, [cities]);

  const addCity = (city: City) => setCities((prev) => [...prev, city]);
  const removeCity = (id: number) => setCities((prev) => prev.filter((c) => c.id !== id));

  return (
    <CityContext.Provider value={{ cities, addCity, removeCity }}>
      {children}
    </CityContext.Provider>
  );
}