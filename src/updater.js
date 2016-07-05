import './styles/updater.scss';

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import cx from 'classnames';

class Updater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    setTimeout(() => {
      this.setState({
        visible: true
      });
    }, 500);
  }
  render() {
    return (
      <div
        className={cx({
          updater: true,
          visible: this.state.visible
        })}
      >
        <div className="updater-image">
        </div>
        <div className="updater-message">
          Updating Toshocat...
        </div>
        <div className="updater-detail">
          Please wait while the new updates are being installed.
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Updater />, document.getElementById('mount'));
