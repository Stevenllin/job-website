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


const BarChart: React.FC<BarChartProps> = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'Sales',
        data: props.data,
        backgroundColor: props.color,
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
        text: 'Monthly Sales Data',
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;