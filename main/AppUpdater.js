const { app, autoUpdater, dialog } = require('electron');
const { EventEmitter } = require('events');

const IDLE_STATE = 'IDLE_STATE';
const DOWNLOADING_STATE = 'DOWNLOADING_STATE';
const CHECKING_STATE = 'CHECKING_STATE';
const ERROR_STATE = 'ERROR_STATE';
const UPDATE_AVAILABLE_STATE = 'UPDATE_AVAILABLE_STATE'; // Already downloaded. Ready for restart.
const NO_UPDATE_AVAILABLE_STATE = 'NO_UPDATE_AVAILABLE_STATE';

class AppUpdater extends EventEmitter {
  constructor() {
    super();

    this.state = IDLE_STATE;

    const version = app.getVersion();
    autoUpdater.setFeedURL(`https://download.toshocat.com/update/win32/${version}`);

    autoUpdater.addListener('update-available', () => {
      console.log('Update available');
      this.setState(DOWNLOADING_STATE);
    });
    autoUpdater.addListener('update-downloaded', () => {
      console.log('New update will be installed on app restart');
      this.setState(UPDATE_AVAILABLE_STATE);
    });
    autoUpdater.addListener('error', (err) => {
      console.log(err);
      this.setState(ERROR_STATE);
    });
    autoUpdater.addListener('checking-for-update', () => {
      console.log('Checking for new updates');
      this.setState(CHECKING_STATE);
    });
    autoUpdater.addListener('update-not-available', () => {
      console.log('No update available');
      dialog.showMessageBox({
        message: 'Toshocat is up to date!',
        buttons: []
      });
      this.setState(NO_UPDATE_AVAILABLE_STATE);
    });
  }
  setState(newState) {
    if (this.state !== newState) {
      this.state = newState;
      this.emit('state-change', newState);
    }
  }
  check(showMessage = false) {
    if (
      this.state !== DOWNLOADING_STATE
      && this.state !== CHECKING_STATE
    ) {
      autoUpdater.checkForUpdates();
    } else if (showMessage) {
      dialog.showMessageBox({
        message: 'Toshocat is already checking for new updates...',
        buttons: []
      });
    }
  }
}

module.exports = AppUpdater;
