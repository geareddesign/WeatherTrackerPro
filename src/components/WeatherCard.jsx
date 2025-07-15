import { WiThermometer, WiHumidity, WiStrongWind } from "react-icons/wi";

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const { name, sys, main, weather: weatherDetails, wind } = weather;
  const icon = weatherDetails[0].icon;
  const description = weatherDetails[0].description;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center text-gray-800 dark:text-white w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-1">
        {name}, {sys.country}
      </h2>
      <p className="capitalize text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt={description}
        className="mx-auto"
      />
      <h3 className="text-4xl font-bold mb-4">{Math.round(main.temp)}°</h3>
      <div className="flex justify-around mt-4 text-sm">
        <div className="flex flex-col items-center">
          <WiThermometer className="text-2xl mb-1" />
          <p>Feels Like</p>
          <p>{Math.round(main.feels_like)}°</p>
        </div>
        <div className="flex flex-col items-center">
          <WiHumidity className="text-2xl mb-1" />
          <p>Humidity</p>
          <p>{main.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <WiStrongWind className="text-2xl mb-1" />
          <p>Wind</p>
          <p>{wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}
