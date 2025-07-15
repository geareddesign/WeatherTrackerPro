import { useState } from "react";

export default function ForecastTable({ forecastData, unit = "metric" }) {
  const [expandedDay, setExpandedDay] = useState(null);

  if (!forecastData || !forecastData.list) return null;

  // Group data by day (e.g., "2025-07-16")
  const groupedByDate = forecastData.list.reduce((acc, entry) => {
    const dateKey = entry.dt_txt.split(" ")[0]; // 'YYYY-MM-DD'
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(entry);
    return acc;
  }, {});

  const formatTemp = (temp) =>
    `${Math.round(temp)}°${unit === "metric" ? "C" : "F"}`;

  const toggleDay = (dateKey) => {
    setExpandedDay((prev) => (prev === dateKey ? null : dateKey));
  };

  return (
    <div className="mt-8 space-y-4">
      {Object.entries(groupedByDate).map(([dateKey, entries]) => {
        const readableDate = new Date(dateKey).toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
        });

        return (
          <div key={dateKey} className="border border-gray-700 rounded bg-gray-800">
            <button
              className="w-full text-left px-4 py-3 bg-blue-700 hover:bg-blue-600 text-white font-semibold"
              onClick={() => toggleDay(dateKey)}
            >
              {readableDate}
            </button>

            {expandedDay === dateKey && (
              <table className="w-full text-sm text-white">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Weather</th>
                    <th className="px-4 py-2">Temp</th>
                    <th className="px-4 py-2">Feels Like</th>
                    <th className="px-4 py-2">Humidity</th>
                    <th className="px-4 py-2">Wind</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => {
                    const date = new Date(entry.dt * 1000);
                    const icon = entry.weather[0].icon;

                    return (
                      <tr key={entry.dt} className="border-t border-gray-600">
                        <td className="px-4 py-2">
                          {date.toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="px-4 py-2 flex items-center gap-2">
                          <img
                            src={`https://openweathermap.org/img/wn/${icon}.png`}
                            alt={entry.weather[0].description}
                            className="w-6 h-6"
                          />
                          <span>{entry.weather[0].description}</span>
                        </td>
                        <td className="px-4 py-2">{formatTemp(entry.main.temp)}</td>
                        <td className="px-4 py-2">
                          {formatTemp(entry.main.feels_like)}
                        </td>
                        <td className="px-4 py-2">{entry.main.humidity}%</td>
                        <td className="px-4 py-2">{entry.wind.speed} m/s</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        );
      })}
    </div>
  );
}
