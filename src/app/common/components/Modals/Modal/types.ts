import { ModalNameEnum } from "../../../../core/enums/modal";

export interface ModalProps {
  name: ModalNameEnum;
  title: string;
  children: any;
  className?: string;
  visible: boolean;
  confirmBtnText?: string | JSX.Element;
  cancelBtnText?: string | JSX.Element;
  onConfirm?: () => void;
  onCancel?: () => void;
}