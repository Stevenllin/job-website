
export interface ProgressBarProps {
  children: any;
  currentStep: string;
  step: Step[];
}

export interface Step {
  title: string;
  value: string;
  visible: boolean;
  url: string;
}

export interface ProgressBarContextValues {
  currentStep: string;
}