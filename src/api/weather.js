const API_KEY = "818fae3fda76ec62f28c11f198e31b98"; // api key from openweathermap.org
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function fetchWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

export async function fetchForecast(city) {
  try {
    const response = await fetch(
      `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Could not fetch forecast data");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}
