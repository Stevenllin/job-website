import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler, ScriptableContext } from 'chart.js';
import { LineChartProps } from './types';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Filler);

const LineChart: React.FC<LineChartProps> = (props) => {
  const data = {
    labels: props.lineChart.labels,
    datasets: [
      {
        data: props.lineChart.data,
        borderColor: '#0766bc',
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 600);

          gradient.addColorStop(0, props.lineChart.color ? '#0766bc' : "rgba(250,174,50,1)");
          gradient.addColorStop(1, '#FFFFFF');
          return gradient;
        },
        fill: 'start',
        tension: 0, // 曲线的弯曲度，0 表示直线
        pointHoverRadius: 0
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.lineChart.title,
        font: {
          size: 24
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // 禁用工具提示
      },
      datalabels: {
        display: false, // 移除 Line Chart 上的值
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Salary',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Jobs',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;