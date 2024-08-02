import { OperationCodeEnum } from "../../../core/enums/operation";

export interface TextEditerProps {
  default: string;
  onSave: (innerHTML: string) => void;
}

export interface TextEditorHandle {
  getEditorContent: () => string;
  setEditorContent?: (content: string, type: OperationCodeEnum) => void;
} 