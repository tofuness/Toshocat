import React, { Component, PropTypes } from 'react';
import TransitionGroup from 'react-addons-css-transition-group';

import Toast from './Toast';

class ToastQueue extends Component {
  render() {
    return (
      <TransitionGroup
        className="toast-queue"
        transitionName="toast"
        transitionEnterTimeout={230}
        transitionLeaveTimeout={800}
      >
        {
          this.props.toastQueue.map((toast) => {
            return <Toast key={toast.id} {...toast} />;
          })
        }
      </TransitionGroup>
    );
  }
}

ToastQueue.propTypes = {
  toastQueue: PropTypes.array.isRequired
};

export default ToastQueue;
