import React, { Component } from 'react';
import cx from 'classnames';
import pubsub from 'pubsub-js';

import Spinner from './UI/Spinner';

class LoadingMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      message: ''
    };
    pubsub.subscribe('SHOW_LOADING_MESSAGE', (topic, message) => {
      this.show(message);
    });
    pubsub.subscribe('HIDE_LOADING_MESSAGE', () => {
      this.hide();
    });
  }
  show = (message) => {
    if (!this.state.visible) {
      $(this.refs.message).velocity({
        opacity: [1, 0],
        translateY: [0, 30]
      }, {
        duration: 600,
        easing: 'easeOutExpo'
      });
    }
    this.setState({
      visible: true,
      message
    });
  }
  hide = () => {
    $(this.refs.message).velocity({
      opacity: [0, 1],
      translateY: [30, 0],
    }, {
      duration: 220,
      easing: 'easeInCubic',
      complete: () => { this.setState({ visible: false }); }
    });
  }
  render() {
    return (
      <div
        ref="message"
        className={cx({
          loading: true,
          visible: this.state.visible
        })}
      >
        <Spinner />
        { this.state.message }
      </div>
    );
  }
}

export default LoadingMessage;
