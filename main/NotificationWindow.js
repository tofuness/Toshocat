const path = require('path');
const { BrowserWindow } = require('electron');
const Positioner = require('electron-positioner');

const ToshocatWindow = require('./ToshocatWindow');

class NotificationWindow extends ToshocatWindow {
  constructor() {
    super();
    this.window = new BrowserWindow({
      width: 400,
      height: 150,
      minWidth: 300,
      minHeight: 150,
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      closable: true,
      transparent: true,
      resizable: false,
      show: false
    });

    this.window.webContents.on('did-finish-load', () => {
      // Finished loading
    });

    this.window.loadURL(`${path.resolve(__dirname, './notification.html')}`);

    // Move window to center
    this.positioner = new Positioner(this.window);
    this.positioner.move('bottomRight');
  }
}

module.exports = NotificationWindow;
