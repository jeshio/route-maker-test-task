import { combineReducers } from "redux-immutable";
import * as RouteMaker from "./RouteMaker";

export default combineReducers({
  [RouteMaker.NAME]: RouteMaker.reducer
});
