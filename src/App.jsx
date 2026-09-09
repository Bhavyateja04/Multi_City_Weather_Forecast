import { useEffect, useState } from "react";

import {
  CloudSun,
  Navigation,
} from "lucide-react";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import SkeletonLoader from "./components/SkeletonLoader";
import EmptyState from "./components/EmptyState";

import { useWeather } from "./hooks/useWeather";

const STORAGE_KEY =
  "weather-dashboard-cities";

const UNIT_KEY =
  "weather-dashboard-unit";

function App() {
  const [cities, setCities] =
    useState(() => {
      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  const [weatherData, setWeatherData] =
    useState({});

  const [unit, setUnit] =
    useState(() => {
      return (
        localStorage.getItem(
          UNIT_KEY
        ) || "C"
      );
    });

  const [loadingCities, setLoadingCities] =
    useState([]);

  const [error, setError] =
    useState("");

  const { fetchWeather } =
    useWeather();

  /* Save cities */

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cities)
    );
  }, [cities]);

  /* Save temperature unit */

  useEffect(() => {
    localStorage.setItem(
      UNIT_KEY,
      unit
    );
  }, [unit]);

  /* Load saved cities */

  useEffect(() => {
    const loadCities = async () => {
      for (const city of cities) {
        const data =
          await fetchWeather(city);

        if (data) {
          setWeatherData(
            (previous) => ({
              ...previous,
              [city]: data,
            })
          );
        }
      }
    };

    if (cities.length > 0) {
      loadCities();
    }
  }, []);
/* Automatic geolocation on first visit */

useEffect(() => {
  const alreadyVisited =
    localStorage.getItem(
      "weather-dashboard-visited"
    );

  // Don't ask again if the user has already
  // visited the application before.
  if (alreadyVisited) {
    return;
  }

  // Mark the visit immediately.
  localStorage.setItem(
    "weather-dashboard-visited",
    "true"
  );

  if (!navigator.geolocation) {
    setError(
      "Geolocation is not supported by your browser."
    );

    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const {
        latitude,
        longitude,
      } = position.coords;

      setLoadingCities([
        "__location__",
      ]);

      const data =
        await fetchWeather(
          `${latitude},${longitude}`
        );

      setLoadingCities([]);

      if (!data) {
        setError(
          "Unable to fetch weather for your location."
        );

        return;
      }

      const city =
        data.location.name;

      setWeatherData(
        (previous) => ({
          ...previous,
          [city]: data,
        })
      );

      setCities(
        (previous) => {
          if (
            previous.includes(city)
          ) {
            return previous;
          }

          return [
            ...previous,
            city,
          ];
        }
      );
    },

    () => {
      setError(
        "Location permission was denied. You can search for a city manually."
      );
    }
  );
}, []);
  /* Add city */

  const addCity = async (city) => {
    const normalized =
      city.trim();

    if (!normalized) return;

    const exists = cities.some(
      (existingCity) =>
        existingCity.toLowerCase() ===
        normalized.toLowerCase()
    );

    if (exists) {
      setError(
        `${normalized} is already added.`
      );

      return;
    }

    setError("");

    setLoadingCities(
      (previous) => [
        ...previous,
        normalized,
      ]
    );

    const data =
      await fetchWeather(
        normalized
      );

    if (data) {
      const actualCity =
        data.location.name;

      setWeatherData(
        (previous) => ({
          ...previous,
          [actualCity]: data,
        })
      );

      setCities(
        (previous) => [
          ...previous,
          actualCity,
        ]
      );
    } else {
      setError(
        `Could not find "${normalized}".`
      );
    }

    setLoadingCities(
      (previous) =>
        previous.filter(
          (cityName) =>
            cityName !== normalized
        )
    );
  };

  /* Remove city */

  const removeCity = (city) => {
    setCities(
      (previous) =>
        previous.filter(
          (cityName) =>
            cityName !== city
        )
    );

    setWeatherData(
      (previous) => {
        const updated = {
          ...previous,
        };

        delete updated[city];

        return updated;
      }
    );
  };

  /* Geolocation */

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported."
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;

        setLoadingCities([
          "__location__",
        ]);

        const data =
          await fetchWeather(
            `${latitude},${longitude}`
          );

        setLoadingCities([]);

        if (!data) {
          setError(
            "Unable to get your location weather."
          );

          return;
        }

        const city =
          data.location.name;

        setWeatherData(
          (previous) => ({
            ...previous,
            [city]: data,
          })
        );

        setCities(
          (previous) => {
            if (
              previous.includes(city)
            ) {
              return previous;
            }

            return [
              ...previous,
              city,
            ];
          }
        );
      },
      () => {
        setError(
          "Location permission was denied."
        );
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}

      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-blue-600 p-3 text-white">
                <CloudSun size={28} />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  Weather Dashboard
                </h1>

                <p className="text-sm text-slate-500">
                  Multi-city weather forecast
                </p>
              </div>

            </div>

            {/* Unit toggle */}

            <div
              data-testid="unit-toggle"
              className="flex rounded-2xl bg-slate-100 p-1"
            >

              <button
                data-testid="celsius-button"
                onClick={() =>
                  setUnit("C")
                }
                className={`rounded-xl px-5 py-2 font-semibold ${
                  unit === "C"
                    ? "bg-white text-blue-600 shadow"
                    : "text-slate-500"
                }`}
              >
                °C
              </button>

              <button
                data-testid="fahrenheit-button"
                onClick={() =>
                  setUnit("F")
                }
                className={`rounded-xl px-5 py-2 font-semibold ${
                  unit === "F"
                    ? "bg-white text-blue-600 shadow"
                    : "text-slate-500"
                }`}
              >
                °F
              </button>

            </div>

          </div>

        </div>
      </header>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Search */}

        <section className="mb-8">

          <div className="flex flex-col gap-3 md:flex-row">

            <SearchBar
              onSearch={addCity}
            />

            <button
              data-testid="location-button"
              onClick={useMyLocation}
              className="flex items-center justify-center gap-2 rounded-2xl border bg-white px-5 py-4 font-semibold hover:border-blue-300"
            >
              <Navigation size={18} />

              Use My Location
            </button>

          </div>

          {error && (
            <div
              data-testid="error-message"
              className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700"
            >
              {error}
            </div>
          )}

        </section>

        {/* Cities */}

        <section>

          <div className="mb-5">

            <h2 className="text-xl font-bold">
              Your Cities
            </h2>

            <p className="text-sm text-slate-500">
              {cities.length}{" "}
              {cities.length === 1
                ? "city"
                : "cities"}{" "}
              saved
            </p>

          </div>

          {cities.length === 0 ? (

            <EmptyState />

          ) : (

            <div className="grid gap-6 xl:grid-cols-2">

              {cities.map((city) => {

                const weather =
                  weatherData[city];

                if (
                  !weather ||
                  loadingCities.includes(city)
                ) {
                  return (
                    <SkeletonLoader
                      key={city}
                    />
                  );
                }

                return (
                  <WeatherCard
                    key={city}
                    weather={weather}
                    unit={unit}
                    onRemove={removeCity}
                  />
                );
              })}

            </div>

          )}

        </section>

      </main>

      {/* Footer */}

      <footer className="mt-12 border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500">
          Weather Dashboard • React • WeatherAPI • Recharts
        </div>
      </footer>

    </div>
  );
}

export default App;