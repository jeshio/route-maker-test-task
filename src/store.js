import { Map, Iterable } from "immutable";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import rootReducer from "./modules/rootReducer";

const middlewares = [ReduxThunk];

// in dev mode
if (process.env.NODE_ENV === "development") {
  const logger = createLogger({
    // immutable accessor
    stateTransformer: state =>
      Iterable.isIterable(state) ? state.toJS() : state
  });
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  Map(),
  applyMiddleware(...middlewares)
);
