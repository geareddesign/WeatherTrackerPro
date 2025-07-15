import React from "react";
import { format } from "date-fns";

export default function ForecastDay({ day, tempUnit }) {
  // Convert temperature based on unit
  const toggleTemp = (tempC) => {
    return tempUnit === "C"
      ? Math.round(tempC)
      : Math.round(tempC * 9 / 5 + 32);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center text-center">
      <p className="font-semibold mb-2">
        {format(new Date(day.date), "EEE, MMM d")}
      </p>
      <button onClick={toggleTemp}>
        Celsius to Fahrenheit
      </button>
      <img
        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
        alt={day.description}
        className="mx-auto mb-2"
        width={60}
        height={60}
      />
      <p className="capitalize mb-2">{day.description}</p>
      <p className="text-lg font-bold">
        {convertTemp(day.temp_min)}°{tempUnit} / {convertTemp(day.temp_max)}°{tempUnit}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        Humidity: {day.humidity}%
      </p>
    </div>
  );
}
