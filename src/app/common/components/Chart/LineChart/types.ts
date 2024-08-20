export interface LineChartProps {
  lineChart: LineChartState
}

export interface LineChartState {
  title: string;
  data: number[],
  labels: string[],
  color: string,
}
