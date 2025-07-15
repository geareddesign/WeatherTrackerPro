import { useState } from "react";
import SearchForm from "./components/SearchForm";
import { fetchWeather } from "./api/weather";
import { fetchForecast } from "./api/weather";
import ForecastChart from "./components/ForecastChart";


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState(null);
  

  const handleSearch = async (city) => {
  setError("");
  const data = await fetchWeather(city);
  const forecastData = await fetchForecast(city);

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
      <h1 className="text-3xl font-bold text-center mb-8">🌤️ Weather Tracker Pro</h1>
      <SearchForm onSearch={handleSearch} />

      {error && <p className="text-center text-red-400">{error}</p>}

      {weatherData && (
        <div className="mt-8 text-center space-y-2">
          <h2 className="text-2xl font-bold">{weatherData.name}</h2>
          <p className="text-lg">{weatherData.weather[0].description}</p>
          <p className="text-4xl font-bold">{weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind: {weatherData.wind.speed} m/s</p>
          {forecast && <ForecastChart forecastData={forecast} />}

        </div>
        
      )}
    </div>
  );
}

export default App;
