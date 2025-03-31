import React, { useEffect, useState } from "react";
import { fetchRainData } from "../ultis/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

import "../styles/rainchart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RainChart({ location }) {
  const [labels, setLabels] = useState([]);
  const [rainData, setRainData] = useState([]);

  useEffect(() => {
    if (location?.lat && location?.lon) {
      const getRainData = async () => {
        const data = await fetchRainData(location.lat, location.lon);
        setLabels(data.map((entry) => entry.time));
        setRainData(data.map((entry) => entry.rain));
      };
      getRainData();
    }
  }, [location]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Rain Chart",
        data: rainData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    barPercentage: 0.6,
    categoryPercentage: 0.8,
  };

  return (
    <div className="rain_chart">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default RainChart;
