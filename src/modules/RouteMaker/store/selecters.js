import { createSelector } from "reselect";
import { NAME } from "../constants";

export const getPoints = state => state.get(NAME).get("points");
export const getMapParams = state => state.get(NAME).get("mapParams");
