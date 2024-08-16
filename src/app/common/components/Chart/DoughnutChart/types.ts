export interface DoughnutProps {
  color: string[];
  doughnutLabels: string[];
  doughnutValues: number[];
  doughnutColor: string[];
  onClick: (value: number, index: number) => void;
}