const path = require('path');
const window = require('electron-window');
const Positioner = require('electron-positioner');

const ToshocatWindow = require('./ToshocatWindow');

class NotificationWindow extends ToshocatWindow {
  constructor() {
    super();
    this.window = window.createWindow({
      width: 400,
      height: 150,
      minWidth: 300,
      minHeight: 150,
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      closable: false,
      transparent: true,
      resizable: false,
      show: false
    });
    this.window.showUrl(`${path.resolve(__dirname, './notification.html')}`);

    // Move window to center
    this.positioner = new Positioner(this.window);
    this.positioner.move('bottomRight');
  }
}

module.exports = NotificationWindow;
