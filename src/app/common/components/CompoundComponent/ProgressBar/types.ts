export interface ProgressBarProps {
  children: any;
  currentStep: string;
  step: Step[];
}

export interface Step {
  title: string;
  value: string;
  visible: boolean;
}

export interface ProgressBarContextValues {
  currentStep: string;
}