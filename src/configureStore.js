import { Map, Iterable } from "immutable";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import rootReducer from "./modules/rootReducer";

export default function configureStore(initialState = Map()) {
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

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./modules/rootReducer", () => {
      const nextRootReducer = require("./modules/rootReducer").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
