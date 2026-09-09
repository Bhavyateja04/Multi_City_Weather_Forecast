import { useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function useWeather() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (query) => {
    if (!query) return null;

    setLoading(true);
    setError("");

    try {
      const url =
        `https://api.weatherapi.com/v1/forecast.json` +
        `?key=${API_KEY}` +
        `&q=${encodeURIComponent(query)}` +
        `&days=7` +
        `&aqi=no` +
        `&alerts=no`;

      const response = await fetch(url);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message ||
          "Unable to fetch weather"
        );
      }

      return data;
    } catch (err) {
      setError(
        err.message ||
        "Unable to fetch weather"
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchWeather,
    loading,
    error,
  };
}