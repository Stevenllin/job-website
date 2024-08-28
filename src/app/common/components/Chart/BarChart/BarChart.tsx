import { BarChartProps } from "./types";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  TooltipItem
} from "chart.js";
import { Bar } from "react-chartjs-2";
import commonService from "../../../../core/services/commonService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip
);

const BarChart: React.FC<BarChartProps> = ({ barChart }) => {
  const data = {
    labels: barChart.labels.map(item => commonService.toAbbreviation(item)),
    datasets: [
      {
        data: barChart.data,
        backgroundColor: '#0766bc',
        borderWidth: 1,
        borderRadius: 16,
        barThickness: 25,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,  // 隱藏圖例
      },
      tooltip: {
        enabled: true,
        /** 移除顏色 */
        displayColors: false,
        padding: 10,
        callbacks: {
          title: (tooltipItems: TooltipItem<'bar'>[]) => {
            const index = tooltipItems[0].dataIndex;
            /** 自 Label 内容 */
            return barChart.labels[index];
          },
          label: (tooltipItem: TooltipItem<'bar'>) => {
            /** 自 Label 内容 */
            return `Average Salary: ${commonService.formatCurrency(tooltipItem.raw as number)}`;
          },
        },
      },
      datalabels: {
        display: false, // 移除 bar 上的值
      },
    },
  };
  // @ts-ignore
  return <Bar data={data} options={options} />;
}

export default BarChart;