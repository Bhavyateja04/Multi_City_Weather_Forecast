import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
} from "lucide-react";

export function getWeatherIcon(condition) {
  const text = condition?.toLowerCase() || "";

  if (text.includes("thunder")) {
    return CloudLightning;
  }

  if (
    text.includes("rain") ||
    text.includes("drizzle") ||
    text.includes("shower")
  ) {
    return CloudRain;
  }

  if (
    text.includes("snow") ||
    text.includes("sleet") ||
    text.includes("ice")
  ) {
    return Snowflake;
  }

  if (
    text.includes("fog") ||
    text.includes("mist") ||
    text.includes("haze")
  ) {
    return CloudFog;
  }

  if (text.includes("cloud")) {
    return Cloud;
  }

  if (text.includes("partly")) {
    return CloudSun;
  }

  return Sun;
}