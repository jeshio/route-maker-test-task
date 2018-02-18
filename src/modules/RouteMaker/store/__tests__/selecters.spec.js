import reducer from "../reducer";
import * as selecters from "../selecters";
import { List, Map, fromJS } from "immutable";
import initialState from "../initialState";
import { NAME } from "../../constants";

describe("modules/RouteMaker/store/selecters", () => {
  const imitateStore = state => Map({ [NAME]: state });
  const emptyState = imitateStore(initialState);
  const filledState = imitateStore(
    initialState.set(
      "points",
      fromJS([
        { id: 1, name: "test0", coordinates: [1, 2] },
        { id: 2, name: "test2", coordinates: [3, 4] },
        { id: 3, name: "test01", coordinates: [10, 21] }
      ])
    )
  );

  it("should get empty array of points when empty", () => {
    expect(selecters.getPoints(emptyState)).toEqual(List());
  });

  it("should get default Map params", () => {
    const mapParams = selecters.getMapParams(emptyState).toJS();
    expect(mapParams).toHaveProperty("center");
    expect(mapParams).toHaveProperty("zoom");
  });

  it("should get points when filled", () => {
    const points = filledState.get(NAME).get("points");
    expect(selecters.getPoints(filledState)).toEqual(points);
  });
});
