import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import { fetchWeather } from "./api/weather";
import { fetchForecast } from "./api/weather";
import ForecastChart from "./components/ForecastChart";
import ForecastDay from "./components/ForecastDay";
import ForecastTable from "./components/ForecastTable.jsx";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState("metric"); // 'metric' or 'imperial'

  const [city, setCity] = useState(null);

  useEffect(() => {
  const loadData = async () => {
    if (!city) return;
    const weather = await fetchWeather(city, unit);
    const forecastData = await fetchForecast(city, unit);

    if (weather && forecastData) {
      setWeatherData(weather);
      setForecast(forecastData);
      setError("");
    } else {
      setWeatherData(null);
      setForecast(null);
      setError("City not found. Please try again.");
    }
  };

  loadData();
}, [unit, city]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  const handleSearch = async (city) => {
    setError("");
    setCity(city);
    const data = await fetchWeather(city, unit);
    const forecastData = await fetchForecast(city, unit);

    if (data && forecastData) {
      setWeatherData(data);
      setForecast(forecastData);
    } else {
      setWeatherData(null);
      setForecast(null);
      setError("City not found. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        🌤️ Weather Tracker Pro
      </h1>
      <SearchForm onSearch={handleSearch}city={city} setCity={setCity} />
      
      <button
        onClick={toggleUnit}
        className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500"
      >
        Switch to {unit === "metric" ? "°F" : "°C"}
      </button>
      {error && <p className="text-center text-red-400">{error}</p>}
      {forecast && <ForecastTable forecastData={forecast} unit={unit} />}
      {weatherData && (
        <div className="mt-8 text-center space-y-2">
          <h2 className="text-2xl font-bold">{weatherData.name}</h2>
          <p className="text-lg">{weatherData.weather[0].description}</p>
          <p className="text-4xl font-bold">{weatherData.main.temp}{unit === "metric" ? "°C" : "°F"}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
          {forecast && <ForecastChart forecastData={forecast} />}
        </div>
      )}
    </div>
  );
}

export default App;
