const { app, autoUpdater } = require('electron');

class AppUpdater {
  constructor(window) {
    this.window = window.window;
  }
  checkForUpdates() {
    const version = app.getVersion();
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
    autoUpdater.setFeedURL(`https://download.toshocat.com/update/win32/${version}`);
    this.window.webContents.once('did-frame-finish-load', () => {
      autoUpdater.checkForUpdates();
    });
  }
}

module.exports = AppUpdater;
