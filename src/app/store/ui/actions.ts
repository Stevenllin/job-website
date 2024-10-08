import { ModalNameEnum } from "../../core/enums/modal";
import { UIActions, UI_MODALS__SET_MODAL_VISIBLE, UI_SPINNERS__SET_SPINNER_VISIBLE } from "./types";

/** 
 * @description [Modals] 設置 Modals 能見度 (Action)
 * @param name Modal 的名稱
 * @param visible 能見度 
*/
export const setModalVisibleAction = (name: ModalNameEnum, visible: boolean): UIActions => ({
  type: UI_MODALS__SET_MODAL_VISIBLE,
  payload: { name, visible }
})

/**
 * @description [Spinners] 設置 Async Spinner 能見度 (Action)
 * @param visible 設置的能見度
*/
export const setSpinnerVisibleAction = (visible: boolean): UIActions => ({
  type: UI_SPINNERS__SET_SPINNER_VISIBLE,
  payload: { visible }
})