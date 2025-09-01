

export type TimeZoneEnum =
  | "Europe/Stockholm"
  | "Asia/Kolkata"
  | "America/New_York"
  | "Australia/Sydney"
  | "Asia/Shanghai"
  | "Asia/Dubai";

// City interface
export interface City {
  id: number;
  name: string;
  timezone: string; //was enum TimeZoneEnum
  country?: string; // OPTIONAL ISSUE API
}

// Add this for the GeoDB API response
// export type GeoDBCity = {
//   id: number;
//   city: string;
//   name: string;
//   country: string;
//   timezone: string | null;
//   latitude: number;
//   longitude: number;
//   type: string; // <-- add this line
//   wikiDataId: string;
// };

// Clock formatting settings // REMOVED 
export interface ClockSettings {
  hour: "2-digit";
  minute: "2-digit";
  second: "2-digit";
  hour12: boolean;
}