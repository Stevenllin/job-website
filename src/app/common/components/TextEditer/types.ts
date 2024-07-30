import { ProcessStepTextEnum } from '../../../features/CreateYourCV/types';

export interface TextEditerProps {
  processStepText: ProcessStepTextEnum;
}

export interface TextEditorHandle {
  getEditorContent: () => string;
} 