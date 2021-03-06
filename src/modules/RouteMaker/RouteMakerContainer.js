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
      <div className="RouteMakerContainer">
        <Components.RouteMaker
          mapComponent={
            <Components.Map
              {...props}
              setMapParams={props.actions.setMapParams}
              setCoordinatesPoint={props.actions.setCoordinatesPoint}
            />
          }
          listComponent={
            <Components.List
              {...props}
              deletePoint={props.actions.deletePoint}
              swapPoint={props.actions.swapPoint}
            />
          }
          pointCreater={
            <Components.PointCreater
              {...props}
              addPoint={props.actions.addPoint}
            />
          }
        />
      </div>
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
