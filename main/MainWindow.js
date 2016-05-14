const path = require('path');
const window = require('electron-window');
const Positioner = require('electron-positioner');

const ToshocatWindow = require('./ToshocatWindow');

class MainWindow extends ToshocatWindow {
  constructor() {
    super();
    this.window = window.createWindow({
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
    this.window.showUrl(`${path.resolve(__dirname, './main.html')}`);

    // Move window to center
    this.positioner = new Positioner(this.window);
    this.positioner.move('center');
  }
}

module.exports = MainWindow;
