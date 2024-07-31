import { Reducer } from 'redux';
import { UIState, UIActions, UI_MODALS__SET_MODAL_VISIBLE } from './types';

/** 
 * @description 初始 UI State
 */
const initialState: UIState = {
  spinners: {},
  modals: {
    previewTemplateVisible: false
  }
}

const UIReducer: Reducer<UIState, UIActions> = (state = initialState, action) => {
  switch (action.type) {
    /** [Modals] 設置 Modal 能見度 */
    case UI_MODALS__SET_MODAL_VISIBLE: {
      return { ...state, modals: { ...state.modals, [action.payload.name + 'Visible']: action.payload.visible } }
    }
    default:
      return state;
  }
}

export default UIReducer;