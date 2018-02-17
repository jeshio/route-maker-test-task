import { List, Map } from "immutable";
import { pointTypes, mapParamTypes } from "./actionTypes";
import initialState from "./initialState";

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case pointTypes.ADD: {
      const { name } = action.payload;
      // координаты - текущий центр карты
      const mapCenter = state.getIn(["mapParams", "center"]);
      const points = state.get("points");
      const lastId = points.last() && points.last().get("id");
      return state.set(
        "points",
        points.push(
          Map({
            id: (lastId || 0) + 1,
            name,
            coordinates: mapCenter
          })
        )
      );
    }
    case pointTypes.DELETE: {
      const { id } = action.payload;
      const points = state.get("points");
      const needleIndex = points.findIndex(p => p.get("id") === id);
      return state.set("points", points.delete(needleIndex));
    }
    case mapParamTypes.SET: {
      const { center, zoom } = action.payload.params;
      return state
        .setIn(["mapParams", "center"], List(center))
        .setIn(["mapParams", "zoom"], zoom);
    }
    default:
      return state;
  }
};
