import React, { Component } from "react";
import PropTypes from "prop-types";
import toJSHOC from "modules/Core/hocs/toJS";

const List = props => (
  <div>
    <ul>{props.points.map(point => <li>{point.name}</li>)}</ul>
  </div>
);

List.propTypes = {
  points: PropTypes.array.isRequired
};

export default List;

export const ListHOC = toJSHOC(List);
