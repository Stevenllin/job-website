import { CommonActions, COMMON__INIT_FETCH_COMMON_DATA, COMMON__INIT_FETCH_COMMON_DATA_DONE } from './types';
import { GetCountriesResp } from '../../api/models/get/getCountries';

/**
 * @description 初始取得系統共用選項資料 (Action)
 */
export const initFetchCommonDataAction = (): CommonActions => ({
  type: COMMON__INIT_FETCH_COMMON_DATA
});

/**
 * @description 初始取得系統共用選項資料 完成 (Action)
 */
export const initFetchCommonDataDoneAction = (response: GetCountriesResp[]): CommonActions => ({
  type: COMMON__INIT_FETCH_COMMON_DATA_DONE,
  payload: {
    response
  }
});