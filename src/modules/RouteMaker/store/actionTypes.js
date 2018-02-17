import { createTypes } from "redux-action-creator";

export const pointTypes = createTypes(
  ["ADD", "DELETE", "SWAP", "SET_COORDS"],
  "POINT"
);

export const mapParamTypes = createTypes(["SET"], "MAP_PARAMS");
