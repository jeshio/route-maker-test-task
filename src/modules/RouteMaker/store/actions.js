import { asyncActionCreator, actionCreator } from "redux-action-creator";
import { pointTypes } from "./actionTypes";

const addPoint = actionCreator(pointTypes.ADD, "point");
