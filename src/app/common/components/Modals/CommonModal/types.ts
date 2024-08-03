export interface CommonModalProps {
  title: string;
  visible: boolean;
  content: string;
  onConfirm: () => void;
}