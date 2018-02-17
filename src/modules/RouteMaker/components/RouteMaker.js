import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const RouteMaker = props => (
  <div className={classnames("RouteMaker", "row")}>
    <div className="RouteMaker__col-left">
      {props.pointCreater}
      {props.listComponent}
    </div>
    <div className="RouteMaker__col-right">{props.mapComponent}</div>
  </div>
);

RouteMaker.propTypes = {
  mapComponent: PropTypes.object.isRequired,
  listComponent: PropTypes.object.isRequired,
  pointCreater: PropTypes.object.isRequired
};

export default RouteMaker;
