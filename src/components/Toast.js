import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import Spinner from './UI/Spinner';

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        visible: true,
      });
    });
  }
  render() {
    return (
      <div
        className={cx({
          toast: true,
          visible: this.state.visible,
          info: this.props.type === 'info',
          success: this.props.type === 'success',
          failure: this.props.type === 'failure',
          loading: this.props.type === 'loading'
        })}
      >
        {this.props.type === 'loading' ? <Spinner /> : null}
        {this.props.message}
      </div>
    );
  }
}

Toast.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string
};

export default Toast;
