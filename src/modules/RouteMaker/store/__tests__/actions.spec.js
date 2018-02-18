import * as actionTypes from "../actionTypes";
import * as actions from "../actions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import initialState from "../initialState";
import { Map } from "immutable";
import { NAME } from "../../constants";
const mockStore = configureMockStore([thunk]);

describe("modules/pokemons/actions", () => {
  const imitateStore = state => Map({ [NAME]: state });
  let store;

  beforeEach(() => {
    store = mockStore(imitateStore(initialState));
  });

  it("should add point", async () => {
    const name = "test";
    await store.dispatch(actions.addPoint(name));
    const actionsStack = store.getActions();
    expect(actionsStack).toHaveLength(1);
    expect(actionsStack[0]).toHaveProperty("type", actionTypes.pointTypes.ADD);
    expect(actionsStack[0]).toHaveProperty("payload.name", name);
  });

  it("should delete point", async () => {
    const id = 3;
    await store.dispatch(actions.deletePoint(id));
    const actionsStack = store.getActions();
    expect(actionsStack).toHaveLength(1);
    expect(actionsStack[0]).toHaveProperty(
      "type",
      actionTypes.pointTypes.DELETE
    );
    expect(actionsStack[0]).toHaveProperty("payload.id", id);
  });

  it("should swap points", async () => {
    const oldIndex = 1;
    const newIndex = 2;
    await store.dispatch(actions.swapPoint(oldIndex, newIndex));
    const actionsStack = store.getActions();
    expect(actionsStack).toHaveLength(1);
    expect(actionsStack[0]).toHaveProperty("type", actionTypes.pointTypes.SWAP);
    expect(actionsStack[0]).toHaveProperty("payload.oldIndex", oldIndex);
    expect(actionsStack[0]).toHaveProperty("payload.newIndex", newIndex);
  });

  it("should set coords to point", async () => {
    const index = 1;
    const coordinates = [1, 1];
    await store.dispatch(actions.setCoordinatesPoint(index, coordinates));
    const actionsStack = store.getActions();
    expect(actionsStack).toHaveLength(1);
    expect(actionsStack[0]).toHaveProperty(
      "type",
      actionTypes.pointTypes.SET_COORDS
    );
    expect(actionsStack[0]).toHaveProperty("payload.index", index);
    expect(actionsStack[0]).toHaveProperty("payload.coordinates", coordinates);
  });

  it("should set map params", async () => {
    const center = [0, 9];
    const zoom = 15;
    await store.dispatch(actions.setMapParams(center, zoom));
    const actionsStack = store.getActions();
    expect(actionsStack).toHaveLength(1);
    expect(actionsStack[0]).toHaveProperty(
      "type",
      actionTypes.mapParamTypes.SET
    );
    expect(actionsStack[0]).toHaveProperty("payload.center", center);
    expect(actionsStack[0]).toHaveProperty("payload.zoom", zoom);
  });
});
