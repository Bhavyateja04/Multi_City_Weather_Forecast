import {
  Droplets,
  Wind,
  X,
  MapPin,
} from "lucide-react";

import ForecastChart from "./ForecastChart";
import { getWeatherIcon } from "../utils/weatherIcons";

function WeatherCard({
  weather,
  unit,
  onRemove,
}) {
  const current = weather.current;
  const location = weather.location;
  const forecast =
    weather.forecast.forecastday;

  const WeatherIcon = getWeatherIcon(
    current.condition.text
  );

  const temperature =
    unit === "C"
      ? current.temp_c
      : current.temp_f;

  const wind =
    unit === "C"
      ? `${current.wind_kph} km/h`
      : `${current.wind_mph} mph`;

  return (
    <article
      data-testid="weather-card"
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
    >
      {/* City header */}

      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MapPin
              size={18}
              className="text-blue-600"
            />

            <h2
              data-testid="city-name"
              className="text-xl font-bold"
            >
              {location.name}
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {location.region},{" "}
            {location.country}
          </p>
        </div>

        <button
          data-testid="remove-city-button"
          onClick={() =>
            onRemove(location.name)
          }
          className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
          aria-label={`Remove ${location.name}`}
        >
          <X size={20} />
        </button>
      </div>

      {/* Current weather */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <div
            data-testid="current-temperature"
            className="text-6xl font-bold"
          >
            {Math.round(temperature)}
            °{unit}
          </div>

          <p
            data-testid="weather-description"
            className="mt-2 text-lg text-slate-500"
          >
            {current.condition.text}
          </p>
        </div>

        <WeatherIcon
          data-testid="weather-icon"
          size={72}
          strokeWidth={1.5}
          className="text-blue-500"
        />
      </div>

      {/* Weather details */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div
          data-testid="humidity"
          className="rounded-2xl bg-blue-50 p-4"
        >
          <Droplets
            size={22}
            className="mb-2 text-blue-600"
          />

          <p className="text-xs text-slate-500">
            Humidity
          </p>

          <p className="font-bold">
            {current.humidity}%
          </p>
        </div>

        <div
          data-testid="wind-speed"
          className="rounded-2xl bg-slate-50 p-4"
        >
          <Wind
            size={22}
            className="mb-2 text-slate-600"
          />

          <p className="text-xs text-slate-500">
            Wind
          </p>

          <p className="font-bold">
            {wind}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="mb-2 text-2xl">
            🌡️
          </p>

          <p className="text-xs text-slate-500">
            Feels like
          </p>

          <p className="font-bold">
            {Math.round(
              unit === "C"
                ? current.feelslike_c
                : current.feelslike_f
            )}
            °{unit}
          </p>
        </div>
      </div>

      {/* Forecast */}

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold">
          7-Day Forecast
        </h3>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {forecast.map((day) => {
            const date = new Date(day.date);

            const high =
              unit === "C"
                ? day.day.maxtemp_c
                : day.day.maxtemp_f;

            const low =
              unit === "C"
                ? day.day.mintemp_c
                : day.day.mintemp_f;

            return (
              <div
                data-testid="forecast-day"
                key={day.date}
                className="rounded-2xl border border-slate-100 p-3 text-center"
              >
                <p className="text-xs font-medium text-slate-500">
                  {date.toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                    }
                  )}
                </p>

                <img
                  src={`https:${day.day.condition.icon}`}
                  alt={day.day.condition.text}
                  className="mx-auto my-2 h-10 w-10"
                />

                <p className="text-sm font-bold">
                  {Math.round(high)}°
                </p>

                <p className="text-xs text-slate-400">
                  {Math.round(low)}°
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart */}

      <ForecastChart
        forecast={forecast}
        unit={unit}
      />
    </article>
  );
}

export default WeatherCard;