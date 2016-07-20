import React, { PropTypes, Component } from 'react';
import ReactOutsideEvent from 'react-outside-event';
import cx from 'classnames';

class Logo extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }
  onOutsideEvent() {
    if (this.state.visible) {
      this.setState({
        visible: false
      });
    }
  }
  toggleMenu = () => {
    this.setState({
      visible: !this.state.visible
    });
  }
  openDevTools = () => {
    remote.getCurrentWindow().webContents.openDevTools({
      detach: true
    });
    this.setState({
      visible: false
    });
    this.props.createToast({
      type: 'info',
      message: 'With great power comes great responsibility',
      timer: 3000
    });
  }
  reloadApp = () => {
    location.reload();
  }
  render() {
    return (
      <div className="logo">
        <div className="logo-image" onClick={this.toggleMenu}>
          <div
            className={cx({
              'logo-menu-arrow': true,
              'icon-chevron-small-down': true,
              active: this.state.visible
            })}
          >
          </div>
        </div>
        <div
          className={cx({
            'logo-menu': true,
            visible: this.state.visible
          })}
        >
          <div className="logo-menu-label">
            Howdy!
          </div>
          <div className="logo-menu-option" onClick={this.openDevTools}>
            Open Developer Tools
          </div>
          <div
            className="logo-menu-option"
            onClick={this.reloadApp}
          >
            Reload Toshocat
          </div>
        </div>
      </div>
    );
  }
}

Logo.propTypes = {
  // Actions
  createToast: PropTypes.func.isRequired
};

export default new ReactOutsideEvent(Logo, ['mouseup']);
