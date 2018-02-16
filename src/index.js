import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./modules/App";
import registerServiceWorker from "./registerServiceWorker";

const rootEl = document.getElementById("root");

ReactDOM.render(<App />, rootEl);
registerServiceWorker();

if (module.hot) {
  module.hot.accept("./modules/App", () => {
    const NextApp = require("./modules/App").default;
    ReactDOM.render(<NextApp />, rootEl);
  });
}
