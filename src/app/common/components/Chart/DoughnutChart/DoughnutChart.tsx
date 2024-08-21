import { Chart as ChartJS, ArcElement, Legend, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DoughnutProps } from './types';
import { useRef } from "react";
import commonService from '../../../../core/services/commonService';

ChartJS.register(ArcElement, Legend, ChartDataLabels);

const DoughnutChart: React.FC<DoughnutProps> = (props) => {
  const selectedLabel = useRef<string>();
  const selectedColor = useRef<string>();
  const valRef = useRef<number>();

  const data = {
    labels: props.doughnutLabels.map(item => commonService.toAbbreviation(item)),
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
    cutout: 145,
    plugins: {
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: 'white',
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

  const plugins = [{
    id: 'text-center',
    beforeDraw: function(chart: any) {
      const { width, height, ctx } = chart;
    
      ctx.save();
      /** 設置文字、X 與 Y 的距離，圓的半徑 */
      const text = selectedLabel.current ?? '';
      const textX = width / 2;
      const textY = height / 2;
      const radius = Math.min(width, height) / 3;
    
      /** 繪畫圓形 */
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
      ctx.fillStyle = selectedLabel.current ? '#0766bc' : 'white';
      ctx.fill();
    
      // Set the text properties
      ctx.font = `1rem sans-serif`;
      /** 設置 垂直 中央 */
      ctx.textBaseline = 'middle';
      /** 設置 水平 中央 */
      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';

      /** 畫出字 */
      ctx.fillText(text, textX, textY-16);
      /** 寫出數值 */
      ctx.font = `bold 1.2rem sans-serif`;
      ctx.fillText(valRef.current, textX, textY+16);

      ctx.restore();
    }
  }];

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.target as HTMLCanvasElement;
    /** Canvas 中取得 Chart 圖表實例 */
    const chart = ChartJS.getChart(canvas);
    if (!chart) return;

    /** nativeEvent 是更接近 DOM 事件的物件 */
    const elements = chart.getElementsAtEventForMode(event.nativeEvent, 'nearest', { intersect: true }, true);

    if (elements.length > 0) {
      const index = elements[0].index;
      const value = chart.data.datasets[0].data[index] as number;
      
      selectedLabel.current = props.doughnutLabels[index]
      selectedColor.current = props.color[index]

      valRef.current = value;
      // 在這裡添加自定義邏輯
      props.onClick(value, index);
    }
  };

  return (
    <Doughnut data={data} options={options} plugins={plugins} onClick={handleClick} />
  )
}

export default DoughnutChart;