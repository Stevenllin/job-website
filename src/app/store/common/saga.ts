import apiServices from '../../api/services/apiServices';
import { put, call, all, takeEvery } from 'redux-saga/effects';
import { COMMON__INIT_FETCH_COMMON_DATA } from './types';
import { initFetchCommonDataDoneAction } from './actions';
import { GetCountriesResp } from '../../api/models/get/getCountries';

export interface ResponseGenerator{
  config?:any,
  data?:any,
  headers?:any,
  request?:any,
  status?:number,
  statusText?:string
}

/**
 * @description 初始取得系統共用選項資料
 */
export function * initFetchCommonData () {
  const countries: GetCountriesResp[] = yield call(apiServices.getCountries);
  yield put(initFetchCommonDataDoneAction(countries))
}

export default function * watchCommonSaga () {
  yield all([
    takeEvery(COMMON__INIT_FETCH_COMMON_DATA, initFetchCommonData)
  ])
}