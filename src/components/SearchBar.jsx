import { Search } from "lucide-react";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      return;
    }

    onSearch(trimmedCity);
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full gap-3"
    >
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          data-testid="city-search-input"
          type="text"
          value={city}
          onChange={(event) =>
            setCity(event.target.value)
          }
          placeholder="Search for a city..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <button
        data-testid="search-button"
        type="submit"
        className="rounded-2xl bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;