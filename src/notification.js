import './styles/notificaiton.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }
  componentDidMount = () => {
    this.fadeOutTimer = null;
    ipcRenderer.on('scrobble-request', (event, data) => {
      setTimeout(() => {
        this.setState({
          visible: true
        });
      }, 100);
      console.log(data);
      clearTimeout(this.fadeOutTimer);
      this.fadeOutTimer = setTimeout(() => {
        this.setState({
          visible: false
        });
      }, 9000);
    });
  }
  handleUpdate = () => {
  }
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }
  render() {
    return (
      <div
        className={cx({
          notification: true,
          visible: this.state.visible
        })}
      >
        <div className="notification-content">
          <div className="notification-legend">
            Now Playing · Episode 2
          </div>
          <div className="notification-message">
            Re:Zero kara Hajimeru Isekai Seikatsu
          </div>
        </div>
        <div className="notification-image">
        </div>
        <div className="notification-actions">
          <div className="notification-action notification-update" onClick={this.handleUpdate}>
            Update
          </div>
          <div className="notification-action notification-cancel" onClick={this.handleCancel}>
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Notification />, document.getElementById('mount'));
