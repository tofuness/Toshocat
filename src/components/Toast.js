import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import Spinner from './UI/Spinner';

class Toast extends Component {
  render() {
    return (
      <div
        className={cx({
          toast: true,
          info: this.props.type === 'info',
          success: this.props.type === 'success',
          failure: this.props.type === 'failure',
          loading: this.props.type === 'loading'
        })}
      >
        {this.props.type !== 'loading' ?
          <div
            className={cx({
              'toast-icon': true,
              'icon-megaphone': this.props.type === 'info',
              'icon-check': this.props.type === 'success',
              'icon-close': this.props.type === 'failure',
            })}
          /> : null}
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
