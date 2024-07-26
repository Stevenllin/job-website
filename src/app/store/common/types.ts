
import { GetCountriesResp } from '../../api/models/get/getCountries';

/** 共用 State */
export interface CommonState {
  country_flag: GetCountriesResp[];
}

/** 共用 Action */
export const COMMON__INIT_FETCH_COMMON_DATA = 'COMMON__INIT_FETCH_COMMON_DATA';
export const COMMON__INIT_FETCH_COMMON_DATA_DONE = 'COMMON__INIT_FETCH_COMMON_DATA_DONE';

export interface InitFetchCommonDataAction {
  type: typeof COMMON__INIT_FETCH_COMMON_DATA;
}


export interface InitFetchCommonDataDoneAction {
  type: typeof COMMON__INIT_FETCH_COMMON_DATA_DONE,
  payload: {
    response: GetCountriesResp[]
  }
}

export type CommonActions = InitFetchCommonDataAction | InitFetchCommonDataDoneAction;