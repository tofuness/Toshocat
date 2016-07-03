const path = require('path');
const { BrowserWindow } = require('electron');
const Positioner = require('electron-positioner');

const ToshocatWindow = require('./ToshocatWindow');

class UpdaterWindow extends ToshocatWindow {
  constructor() {
    super();
    this.window = new BrowserWindow({
      width: 300,
      height: 300,
      frame: false,
      skipTaskbar: true,
      closable: false,
      transparent: false,
      alwaysOnTop: false,
      resizable: false,
      backgroundColor: '#e3e6eb',
      show: false
    });

    this.window.loadURL(`${path.resolve(__dirname, './updater.html')}`);

    this.positioner = new Positioner(this.window);
    this.positioner.move('center');
  }
}

module.exports = UpdaterWindow;
