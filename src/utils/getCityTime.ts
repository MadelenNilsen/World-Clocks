import type { ClockSettings } from "../types";

export const getCityTime = (
  currentTime: Date,
  timezone: string,
  settings: ClockSettings
): string => {
  try {
    // DEBUG: log the timezone being used
    // console.log("Getting time for timezone:", timezone);

    return currentTime
      .toLocaleTimeString("en-US", { ...settings, timeZone: timezone });
  } catch (error) {
    console.warn(`Invalid timezone "${timezone}", falling back to UTC.`, error);
    return currentTime
      .toLocaleTimeString("en-US", { ...settings, timeZone: "UTC" });
    
  }
};
