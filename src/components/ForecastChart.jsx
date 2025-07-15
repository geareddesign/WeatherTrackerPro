import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend);

export default function ForecastChart({ forecastData }) {
  const labels = forecastData.list
    .filter((_, idx) => idx % 8 === 0) // one per day (every 24h)
    .map((item) => new Date(item.dt_txt).toLocaleDateString());

  const temps = forecastData.list
    .filter((_, idx) => idx % 8 === 0)
    .map((item) => item.main.temp);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f650",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" } },
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { ticks: { color: "white" } },
    },
  };

  return (
    <div className="mt-10 bg-gray-800 p-4 rounded shadow-md">
      <h3 className="text-xl font-bold mb-4 text-white">5-Day Forecast</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}
