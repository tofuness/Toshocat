import React, { Component, PropTypes } from 'react';

import cx from 'classnames';
import Toast from './Toast';

class ToastQueue extends Component {
  render() {
    return (
      <div className="toast-queue">
        {
          this.props.toastQueue.map((toast) => {
            return <Toast key={toast.id} {...toast} />;
          })
        }
      </div>
    );
  }
}

ToastQueue.propTypes = {
  toastQueue: PropTypes.array.isRequired
};

export default ToastQueue;
