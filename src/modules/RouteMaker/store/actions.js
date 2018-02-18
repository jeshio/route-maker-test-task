import { actionCreator } from "redux-action-creator";
import * as actionTypes from "./actionTypes";

export const addPoint = actionCreator(actionTypes.pointTypes.ADD, "name");
export const deletePoint = actionCreator(actionTypes.pointTypes.DELETE, "id");
export const swapPoint = actionCreator(
  actionTypes.pointTypes.SWAP,
  "oldIndex",
  "newIndex"
);
export const setCoordinatesPoint = actionCreator(
  actionTypes.pointTypes.SET_COORDS,
  "index",
  "coordinates"
);
export const setMapParams = actionCreator(
  actionTypes.mapParamTypes.SET,
  "center",
  "zoom"
);
