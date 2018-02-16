import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.scss";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./configureStore";

const rootEl = document.getElementById("root");

const store = configureStore();

const render = () => {
  const App = require("./modules/App").default;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept("./modules/App", () => {
    setTimeout(render);
  });
}

render();

registerServiceWorker();
