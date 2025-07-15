import React, { useState } from "react";
import ForecastDay from "./ForecastDay";

export default function ForecastSection({ forecast }) {
  const [tempUnit, setTempUnit] = useState("C");

  const toggleUnit = () => {
    setTempUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">5-Day Forecast</h2>
        <button
          onClick={toggleUnit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Show °{tempUnit === "C" ? "F" : "C"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecast.map((day) => (
          <ForecastDay key={day.date} day={day} tempUnit={tempUnit} />
        ))}
      </div>
    </section>
  );
}
