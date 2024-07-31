import { combineReducers } from "redux";
import commonReducer from './common/reducer';
import UIReducer from "./ui/reducer";

const rootReducer = combineReducers({
  common: commonReducer,
  UI: UIReducer,
})

export default rootReducer;