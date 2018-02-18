import reducer from "../reducer";
import { List, fromJS, Map } from "immutable";
import * as actionTypes from "../actionTypes";
import initialState from "../initialState";
import { NAME } from "../../constants";
import { mapParamTypes } from "../actionTypes";

describe("modules/RouteMaker/store/reducer", () => {
  const filledState = initialState.set(
    "points",
    fromJS([
      { id: 1, name: "test0", coordinates: [1, 2] },
      { id: 2, name: "test2", coordinates: [3, 4] },
      { id: 3, name: "test01", coordinates: [10, 21] }
    ])
  );

  it("should have initial state", () => {
    expect(reducer()).toEqual(initialState);
  });

  it("should not affect state", () => {
    const state = reducer(initialState, { type: "NOT_EXISTING" });
    expect(state).toEqual(initialState);
  });

  it("should add new point with coords equals to map center", () => {
    const action = {
      type: actionTypes.pointTypes.ADD,
      payload: {
        name: "Test"
      }
    };

    const state = reducer(initialState, action);
    const mapCenter = initialState.getIn(["mapParams", "center"]);

    expect(
      state
        .get("points")
        .first()
        .get("coordinates")
    ).toEqual(mapCenter);
  });

  it("should add first point with id = 1", () => {
    const action = {
      type: actionTypes.pointTypes.ADD,
      payload: {
        name: "Test"
      }
    };

    const state = reducer(initialState, action);
    const firstId = state.getIn(["points", 0, "id"]);

    expect(firstId).toEqual(1);
  });

  it("should add second point with id = 2", () => {
    const action = {
      type: actionTypes.pointTypes.ADD,
      payload: {
        name: "Test"
      }
    };

    // makes reduce twice
    const state = reducer(reducer(initialState, action), action);
    const secondId = state.getIn(["points", 1, "id"]);

    expect(secondId).toEqual(2);
  });

  it("should delete point by id", () => {
    const action = {
      type: actionTypes.pointTypes.DELETE,
      payload: {
        id: 1
      }
    };

    expect(filledState.getIn(["points", 0, "id"])).toEqual(1);
    expect(filledState.get("points").size).toEqual(3);
    const state = reducer(filledState, action);
    expect(state.getIn(["points", 0, "id"])).toEqual(2);
    expect(state.get("points").size).toEqual(2);
  });

  it("should swap first and second points", () => {
    const action = {
      type: actionTypes.pointTypes.SWAP,
      payload: {
        oldIndex: 0,
        newIndex: 1
      }
    };

    const firstPoint = filledState.get("points").get(0);
    const secondPoint = filledState.get("points").get(1);
    const state = reducer(filledState, action);
    expect(state.get("points").get(0)).toEqual(secondPoint);
    expect(state.get("points").get(1)).toEqual(firstPoint);
  });

  it("should set coords to point by index", () => {
    const newCoordinates = [100, 101];
    const action = {
      type: actionTypes.pointTypes.SET_COORDS,
      payload: {
        index: 0,
        coordinates: newCoordinates
      }
    };

    const firstPointCoordinates = filledState.getIn([
      "points",
      0,
      "coordinates"
    ]);
    const state = reducer(filledState, action);
    const newFirstPointCoordinates = state.getIn(["points", 0, "coordinates"]);
    expect(newFirstPointCoordinates).not.toEqual(firstPointCoordinates);
    expect(newFirstPointCoordinates).toEqual(List(newCoordinates));
  });

  it("should set map params", () => {
    const newCenter = [100, 101];
    const newZoom = 4;
    const action = {
      type: actionTypes.mapParamTypes.SET,
      payload: {
        center: newCenter,
        zoom: newZoom
      }
    };

    const oldMapCenter = filledState.getIn(["mapParams", "center"]);
    const oldMapZoom = filledState.getIn(["mapParams", "zoom"]);
    const state = reducer(filledState, action);
    const newMapCenter = state.getIn(["mapParams", "center"]);
    const newMapZoom = state.getIn(["mapParams", "zoom"]);
    expect(newMapCenter).not.toEqual(oldMapCenter);
    expect(newMapCenter).toEqual(List(newCenter));
    expect(newMapZoom).not.toEqual(oldMapZoom);
    expect(newMapZoom).toEqual(newZoom);
  });
});
