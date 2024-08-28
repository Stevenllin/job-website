import { CommonState, CommonActions, COMMON__INIT_FETCH_COMMON_DATA_DONE } from './types';
import commonReducer from './reducer';

describe('commonReducer', () => {
  /** 測試初始狀態 */
  it('應該返回初始狀態', () => {
    /** 初始化狀態 */
    const initialState: CommonState = {
      country_flag: []
    };
    expect(commonReducer(undefined, {} as CommonActions)).toEqual(initialState);
  });
  /** 測試觸發 COMMON__INIT_FETCH_COMMON_DATA_DONE 後的狀態 */
  it('應處理 COMMON__INIT_FETCH_COMMON_DATA_DONE action', () => {
    // 模擬的 payload
    const mockResponse = [
      { name: 'Taiwan', flag: '🇹🇼', iso2: 'TW', iso3: 'TWN' },
      { name: 'Japan', flag: '🇯🇵', iso2: 'JP', iso3: 'JPN' }
    ];
    /** 建立 Action */
    const action: CommonActions = {
      type: COMMON__INIT_FETCH_COMMON_DATA_DONE,
      payload: { response: mockResponse }
    };
    /** 預期的狀態 */
    const expectedState: CommonState = {
      country_flag: mockResponse
    };
    expect(commonReducer(undefined, action)).toEqual(expectedState);
  });
});