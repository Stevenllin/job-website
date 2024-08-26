import { Reducer } from 'redux';
import { UIState, UIActions, UI_MODALS__SET_MODAL_VISIBLE, UI_SPINNERS__SET_SPINNER_VISIBLE } from './types';

/** 
 * @description 初始 UI State
 */
const initialState: UIState = {
  spinners: {
    visible: false,
  },
  modals: {
    previewTemplateVisible: false,
    educationSampleRefVisible: false,
    commonVisible: false
  }
}

const UIReducer: Reducer<UIState, UIActions> = (state = initialState, action) => {
  switch (action.type) {
    /** [Modals] 設置 Modal 能見度 */
    case UI_MODALS__SET_MODAL_VISIBLE: {
      return { ...state, modals: { ...state.modals, [action.payload.name + 'Visible']: action.payload.visible } }
    }
    /** [Spinners] 設置 Async Spinner 能見度 (Action) */
    case UI_SPINNERS__SET_SPINNER_VISIBLE: {
      return { ...state, spinners: { visible: action.payload.visible  }}
    }
    default:
      return state;
  }
}

export default UIReducer;