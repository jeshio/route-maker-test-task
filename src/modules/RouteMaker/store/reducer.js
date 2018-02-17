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
      const lastId =
        points.size > 0 && points.maxBy(point => point.get("id")).get("id");
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
    case pointTypes.SWAP: {
      const { oldIndex, newIndex } = action.payload;
      const tempPoint = state.getIn(["points", newIndex]);
      const swapPoint = state.getIn(["points", oldIndex]);
      return state
        .setIn(["points", newIndex], swapPoint)
        .setIn(["points", oldIndex], tempPoint);
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
