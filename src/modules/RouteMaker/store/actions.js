import { actionCreator } from "redux-action-creator";
import * as actionTypes from "./actionTypes";

export const addPoint = actionCreator(actionTypes.pointTypes.ADD, "name");
export const setMapParams = actionCreator(
  actionTypes.mapParamTypes.SET,
  "params"
);
