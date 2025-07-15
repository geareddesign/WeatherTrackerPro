import { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8"
    >
      <input
        type="text"
        placeholder="City, Country ex: Elkin, US"
        className="px-4 py-2 rounded w-full sm:w-64 text-black"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
      >
        Search
      </button>
    </form>
  );
}
