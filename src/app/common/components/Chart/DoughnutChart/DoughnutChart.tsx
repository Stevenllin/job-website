import { Chart as ChartJS, ArcElement, Legend, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DoughnutProps } from './types';

ChartJS.register(ArcElement, Legend, ChartDataLabels);

const DoughnutChart: React.FC<DoughnutProps> = (props) => {
  const data = {
    labels: props.doughnutLabels,
    datasets: [
      {
        data: props.doughnutValues,
        backgroundColor: props.doughnutColor,
        hoverBackgroundColor: props.doughnutColor,
        hoverBorderColor: props.doughnutColor
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: 200,
    plugins: {
      datalabels: {
        color: 'black',
        anchor: 'center',
        align: 'center',
        formatter: (_: number, context: any) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
      legend: {
        display: false,
      },
    },
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.target as HTMLCanvasElement;
    /** Canvas 中取得 Chart 圖表實例 */
    const chart = ChartJS.getChart(canvas);
    if (!chart) return;

    /** nativeEvent 是更接近 DOM 事件的物件 */
    const elements = chart.getElementsAtEventForMode(event.nativeEvent, 'nearest', { intersect: true }, true);

    if (elements.length > 0) {
      const index = elements[0].index;
      const label = chart.data.labels?.[index] as string;
      const value = chart.data.datasets[0].data[index] as number;
      
      // 在這裡添加自定義邏輯
      props.onClick(label, value, index);
    }
  };

  return (
    <Doughnut data={data} options={options} onClick={handleClick} />
  )
}

export default DoughnutChart;