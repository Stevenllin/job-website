import { ModalNameEnum } from "../../core/enums/modal";

/** UI 相關的 State */
export interface UIState {
  spinners: SpinnerState;
  modals: ModalState;
}

interface ModalState {
  previewTemplateVisible: boolean;
  educationSampleRefVisible: boolean;
  commonVisible: boolean;
}

interface SpinnerState {

}

/** UI 相關的 Action */
export const UI_MODALS__SET_MODAL_VISIBLE = 'UI_MODALS__SET_MODAL_VISIBLE';

/** 設置 Modal 的能見度 */
export interface SetModalVisibleAction {
  type: typeof UI_MODALS__SET_MODAL_VISIBLE;
  payload: {
    name: ModalNameEnum;
    visible: boolean;
  }
}

export type UIActions = SetModalVisibleAction;