import React, { useState } from "react";

export default function CurrentWeather({ data }) {
  const [tempUnit, setTempUnit] = useState("C");

  const toggleUnit = () => {
    setTempUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  const convertTemp = (tempC) =>
    tempUnit === "C" ? tempC : tempC * 1.8 + 32;

  if (!data) return null;

  return (
    <section className="bg-white p-6 rounded shadow mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Current Weather</h2>
        <button
          onClick={toggleUnit}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Show °{tempUnit === "C" ? "F" : "C"}
        </button>
      </div>
      <div className="flex items-center space-x-6">
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          className="w-20 h-20"
        />
        <div>
          <p className="text-3xl font-bold">
            {convertTemp(data.temp).toFixed(1)}°{tempUnit}
          </p>
          <p className="capitalize">{data.description}</p>
          <p>Humidity: {data.humidity}%</p>
          <p>Wind: {data.windSpeed} m/s</p>
        </div>
      </div>
    </section>
  );
}
