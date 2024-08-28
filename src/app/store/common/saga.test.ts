import { all, takeEvery, call, put } from 'redux-saga/effects';
import { COMMON__INIT_FETCH_COMMON_DATA } from './types';
import { initFetchCommonData } from './saga';
import watchCommonSaga from './saga';
import apiServices from '../../api/services/apiServices';
import { GetCountriesResp } from '../../api/models/get/getCountries';
import { initFetchCommonDataDoneAction } from './actions';

describe('Common Saga', () => {
  /** 測試監聽 COMMON__INIT_FETCH_COMMON_DATA action 並觸發 initFetchCommonData Saga */
  it('應監聽 COMMON__INIT_FETCH_COMMON_DATA action 並觸發 initFetchCommonData Saga', () => {
    const generator = watchCommonSaga();
    expect(generator.next().value).toEqual(
      all([takeEvery(COMMON__INIT_FETCH_COMMON_DATA, initFetchCommonData)])
    );
    /** 檢查 generator 是否完成 */
    expect(generator.next().done).toBe(true);
  });
  /** 測試 initFetchCommonData 的執行順序 */
  it('應處理 initFetchCommonData Saga', () => {
    const mockResponse: GetCountriesResp[] = [
      { name: 'Taiwan', flag: '🇹🇼', iso2: 'TW', iso3: 'TWN' }
    ];
    const generator = initFetchCommonData();
    /** 檢查 generator 呼叫了 API */
    expect(generator.next().value).toEqual(call(apiServices.getCountries));
    /** 檢查 generator dispatch 了正確的 action */
    expect(generator.next(mockResponse).value).toEqual(put(initFetchCommonDataDoneAction(mockResponse)));
    /** 檢查 generator 是否完成 */
    expect(generator.next().done).toBe(true);
  });
});