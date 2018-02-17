import React, { Component } from "react";
import PropTypes from "prop-types";

class TextBox extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    placeholder: "",
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
        {...this.props}
        type="text"
        value={this.state.value}
        onChange={e => this.onChange(e)}
        placeholder={this.props.placeholder}
        name={this.props.name}
      />
    );
  }
}

export default TextBox;
