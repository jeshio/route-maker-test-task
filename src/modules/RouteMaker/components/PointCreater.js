import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextBox } from "modules/Core/components";

class PointCreater extends Component {
  static propTypes = {
    addPoint: PropTypes.func.isRequired
  };

  onSubmit(e) {
    e.preventDefault();
    const { value } = this.pointName;
    this.props.addPoint(value);
    this.pointName.value = "";
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <TextBox name="pointName" ref={ref => (this.pointName = ref)} />
      </form>
    );
  }
}

export default PointCreater;
