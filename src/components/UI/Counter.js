import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  componentDidMount = () => {
    if (this.props.currentValue) {
      this.setValue(this.props.currentValue);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (_.isNumber(nextProps.currentValue)) {
      this.setValue(nextProps.currentValue, false);
    }
  }
  onWheel = (e) => {
    const incrementValue = (e.deltaY > 0) ? -1 : 1;
    this.setValue(Number(this.state.value) + incrementValue);
    e.preventDefault();
  }
  onKeyDown = (e) => {
    if ([38, 40].indexOf(e.keyCode) > -1) {
      // up arrow, down arrow
      this.setValue(e.keyCode === 38 ? Number(this.state.value) + 1 : Number(this.state.value) - 1);
      e.preventDefault();
    }
  }
  setValue = (newValue, triggerProp = true) => {
    let value = newValue;
    if (
      !isNaN(value) &&
      value <= this.props.max &&
      value >= this.props.min
    ) {
      value = Math.floor(value);
      value = value === this.props.min ? '' : value;
      this.setState({
        value
      });
      if (triggerProp) {
        this.props.handleChange(value);
      }
    }
  }
  handleChange = (e) => {
    this.setValue(e.target.value);
    e.preventDefault();
  }
  render() {
    return (
      <div className="ui-counter">
        <input
          type="text"
          className="ui-counter-input"
          ref="counterInput"
          onWheel={this.onWheel}
          onKeyDown={this.onKeyDown}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

Counter.propTypes = {
  handleChange: PropTypes.func,
  max: PropTypes.number,
  min: PropTypes.number,
  currentValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

Counter.defaultProps = {
  max: 999, // Inclusive
  min: 0, // Exclusive
};

export default Counter;
