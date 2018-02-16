import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./store/actions";
import { NAME } from "./constants";
import "./style.scss";
import Map from "./components/Map";

class RouteMakerContainer extends Component {
  render() {
    return (
      <div className="RouteMaker">
        <Map />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const store = state.get(NAME);
  return {};
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RouteMakerContainer
);
