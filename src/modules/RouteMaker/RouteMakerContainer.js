import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./store/actions";
import { NAME } from "./constants";
import "./style.scss";
import * as Components from "./components";

class RouteMakerContainer extends Component {
  render() {
    const { props } = this;
    return (
      <Components.RouteMaker
        mapComponent={<Components.Map {...props} />}
        listComponent={<Components.List {...props} />}
      />
    );
  }
}

function mapStateToProps(state) {
  const store = state.get(NAME);
  return {
    points: store.get("points")
  };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RouteMakerContainer
);
