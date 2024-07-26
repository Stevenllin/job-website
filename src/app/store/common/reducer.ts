import { Reducer } from 'redux';
import { CommonState, CommonActions, COMMON__INIT_FETCH_COMMON_DATA_DONE } from './types';

const initialState: CommonState = {
  country_flag: []
}

const commonReducer: Reducer<CommonState, CommonActions> = (state = initialState, action): CommonState => {
  switch (action.type) {
    case COMMON__INIT_FETCH_COMMON_DATA_DONE: {
      return { ...state, country_flag: [...action.payload.response] }
    }
    default:
      return state;
  }
}

export default commonReducer;