import React, { Component } from 'react';

import KickerContainer from '../containers/KickerContainer';
import settings from '../utils/settings';

class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false
    };
  }
  handleClose() {
    if (settings.get('minimizeToTray')) {
      remote.getCurrentWindow().minimize();
      remote.getCurrentWindow().setSkipTaskbar(true);
    } else {
      remote.getCurrentWindow().close();
    }
  }
  handleMinimize() {
    remote.getCurrentWindow().minimize();
  }
  handleMaximize() {
    if (remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().unmaximize();
    } else {
      remote.getCurrentWindow().maximize();
    }
    this.setState({
      fullscreen: remote.getCurrentWindow().isMaximized()
    });
  }
  render() {
    return (
      <div className="titlebar">
        <KickerContainer />
        <div className="titlebar-draggable">
        </div>
        <div className="titlebar-controls">
          <div className="titlebar-minimize icon-minus" onClick={this.handleMinimize}></div>
          <div
            className="titlebar-maximize icon-document-landscape"
            onClick={this.handleMaximize}
          >
          </div>
          <div className="titlebar-close icon-close" onClick={this.handleClose}></div>
        </div>
      </div>
    );
  }
}

export default TitleBar;
