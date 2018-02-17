import React, { Component } from "react";
import PropTypes from "prop-types";

class TextBox extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => {}
  };

  constructor() {
    super();
    this.state = {
      value: ""
    };
  }

  set value(value) {
    this.setState(() => ({ value: value }));
  }

  get value() {
    return this.state.value;
  }

  onChange(e) {
    const { value } = e.target;
    this.setState(
      () => ({ value }),
      () => this.props.onChange(this.state.value)
    );
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={e => this.onChange(e)}
        name={this.props.name}
      />
    );
  }
}

export default TextBox;
