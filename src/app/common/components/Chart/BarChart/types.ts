export interface BarChartProps {
  barChart: BarChartState
}

export interface BarChartState {
  title: string;
  data: number[],
  labels: string[],
  color: string,
}
