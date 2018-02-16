import React, { Component } from "react";
import logo from "../../logo.svg";
import "./style.scss";
import { RouteMaker } from "modules/RouteMaker";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App__layout">
          <div className="App__row">
            <div className="App__content">
              <RouteMaker />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
