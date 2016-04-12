import React, { Component, PropTypes } from 'react';
import Spin from 'spin.js';
import cx from 'classnames';

class Spinner extends Component {
  componentDidMount = () => {
    const opts = {
      lines: 8,
      length: 2,
      width: 2,
      radius: 3,
      corners: 1,
      color: this.props.color,
      speed: this.props.speed,
      trail: 80,
      zIndex: 2,
      hwaccel: true,
      opacity: 0.1
    };
    this.spinner = new Spin(opts).spin();
    $(this.refs.spinner).prepend(this.spinner.el);
  }
  componentWillUnmount() {
    this.spinner.stop();
  }
  render = () => {
    return (
      <div
        className={cx({
          'ui-spinner': true,
          visible: this.props.visible
        })}
        ref="spinner"
      ></div>
    );
  }
}

Spinner.defaultProps = {
  color: '#fff',
  visible: true,
  speed: 2.7
};

Spinner.propTypes = {
  color: PropTypes.string,
  visible: PropTypes.bool,
  speed: PropTypes.number
};

export default Spinner;
