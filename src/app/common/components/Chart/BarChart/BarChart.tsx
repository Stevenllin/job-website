import { BarChartProps } from "./types";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend
);

const BarChart: React.FC<BarChartProps> = ({ barChart }) => {
  const data = {
    labels: barChart.labels,
    datasets: [
      {
        data: barChart.data,
        backgroundColor: barChart.color,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,  // 隱藏圖例
      },
      title: {
        display: true,
        text: `Overview of ${barChart.title}`,
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;