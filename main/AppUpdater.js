const { app, autoUpdater } = require('electron');

class AppUpdater {
  constructor(window) {
    this.window = window.window;
  }
  init() {
    const version = app.getVersion();
    autoUpdater.setFeedURL(`https://download.toshocat.com/update/win32/${version}`);

    autoUpdater.addListener('update-available', () => {
      console.log('Update available');
    });
    autoUpdater.addListener('update-downloaded', () => {
      console.log('New update will be installed on app restart');
    });
    autoUpdater.addListener('error', (err) => {
      console.log(err);
    });
    autoUpdater.addListener('checking-for-update', () => {
      console.log('Checking for new updates');
    });
    autoUpdater.addListener('update-not-available', () => {
      console.log('No update available');
    });
    this.window.webContents.once('did-frame-finish-load', () => {
      console.log('Trying to run checkForUpdates');
      autoUpdater.checkForUpdates();
    });
  }
}

module.exports = AppUpdater;
