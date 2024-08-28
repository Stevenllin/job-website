import UIReducer from './reducer';
import { UIState, UIActions, UI_MODALS__SET_MODAL_VISIBLE, UI_SPINNERS__SET_SPINNER_VISIBLE } from './types';
import { ModalNameEnum } from "../../core/enums/modal";

describe('UIReducer', () => {
  const initialState: UIState = {
    spinners: { visible: false },
    modals: {
      previewTemplateVisible: false,
      educationSampleRefVisible: false,
      commonVisible: false,
    },
  };
  it('在沒有 action 傳入時應返回初始狀態', () => {
    const result = UIReducer(undefined, {} as UIActions);
    expect(result).toEqual(initialState);
  });
  it('應處理 UI_MODALS__SET_MODAL_VISIBLE action', () => {
    /** 建立 Action */
    const action: UIActions = {
      type: UI_MODALS__SET_MODAL_VISIBLE,
      payload: { name: ModalNameEnum.PreviewTemplate, visible: true },
    };
    /** 預期的狀態 */
    const expectedState = {
      ...initialState,
      modals: { ...initialState.modals, previewTemplateVisible: true },
    };
    /** 對應的 Modal previewTemplateVisible 打開 */
    const result = UIReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
  it('應處理 UI_SPINNERS__SET_SPINNER_VISIBLE action', () => {
    /** 建立 Action */
    const action: UIActions = {
      type: UI_SPINNERS__SET_SPINNER_VISIBLE,
      payload: { visible: true },
    };
    /** 預期的狀態 */
    const expectedState = {
      ...initialState,
      spinners: { visible: true },
    };
    /** 打開 Spinner */
    const result = UIReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });
})