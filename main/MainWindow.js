const path = require('path');
const { BrowserWindow } = require('electron');
const Positioner = require('electron-positioner');

const ToshocatWindow = require('./ToshocatWindow');
const settings = require('./settings');

class MainWindow extends ToshocatWindow {
  constructor() {
    super();
    this.window = new BrowserWindow({
      minWidth: 500,
      minHeight: 500,
      width: 1180,
      height: 800,
      title: 'toshocat',
      frame: false,
      transparent: false,
      backgroundColor: '#24282a',
      show: false
    });

    this.window.loadURL(`${path.resolve(__dirname, './main.html')}`);

    // Move window to center
    this.positioner = new Positioner(this.window);
    this.positioner.move('center');
  }
  show() {
    if (!settings.get('minimizedOnStartup')) {
      setTimeout(() => {
        this.window.focus();
        this.window.show();
      }, 500);
    }
  }
}

module.exports = MainWindow;
