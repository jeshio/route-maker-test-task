import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./store/actions";
import * as selecters from "./store/selecters";
import { NAME } from "./constants";
import "./style.scss";
import * as Components from "./components";

class RouteMakerContainer extends Component {
  render() {
    const { props } = this;
    return (
      <Components.RouteMaker
        mapComponent={
          <Components.Map
            {...props}
            setMapParams={props.actions.setMapParams}
          />
        }
        listComponent={
          <Components.List {...props} deletePoint={props.actions.deletePoint} />
        }
        pointCreater={
          <Components.PointCreater
            {...props}
            addPoint={props.actions.addPoint}
          />
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    points: selecters.getPoints(state),
    mapParams: selecters.getMapParams(state)
  };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RouteMakerContainer
);
