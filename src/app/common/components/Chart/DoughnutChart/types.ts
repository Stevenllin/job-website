export interface DoughnutProps {
  doughnutLabels: string[];
  doughnutValues: number[];
  doughnutColor: string[];
  onClick: (value: string, label: number, index: number) => void;
}