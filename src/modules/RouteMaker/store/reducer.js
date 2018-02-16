import { pointTypes } from "./actionTypes";
import initialState from "./initialState";

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case pointTypes.ADD:
      console.log(pointTypes.ADD, action);
      return state;
    default:
      return state;
  }
};
