import { ModalNameEnum } from "../../core/enums/modalName";
import { UIActions, UI_MODALS__SET_MODAL_VISIBLE } from "./types";

/** 
 * @description [Modals] 設置 Modals 能見度 (Action)
 * @param name Modal 的名稱
 * @param visible 能見度 
*/
export const setModalVisibleAction = (name: ModalNameEnum, visible: boolean): UIActions => ({
  type: UI_MODALS__SET_MODAL_VISIBLE,
  payload: { name, visible }
})
