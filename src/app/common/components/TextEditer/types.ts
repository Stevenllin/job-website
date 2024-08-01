export interface TextEditerProps {
  default: string;
  onSave: (innerHTML: string) => void;
}

export interface TextEditorHandle {
  getEditorContent: () => string;
} 