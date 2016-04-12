'use strict';

require('crash-reporter').start({
  companyName: 'toshocat',
  submitURL: 'https://toshocat.com'
});

const app = require('app');
const path = require('path');
const BrowserWindow = require('browser-window');
const Positioner = require('electron-positioner');
const Tray = require('tray');
const Menu = require('menu');
const ipc = require('ipc');

let appIcon = null;
let mainWindow = null;
let mainWindowPositioner = null;
let notificationWindow = null;
let notificationWindowPositioner = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function restoreMainWindow() {
  mainWindow.restore();
  mainWindow.focus();
  mainWindow.setSkipTaskbar(false);
}

function closeMainWindow() {
  appIcon.destroy();
  appIcon = null;
  mainWindow.close();
}

app.on('ready', () => {
  notificationWindow = new BrowserWindow({
    width: 400,
    height: 150,
    'min-width': 300,
    'min-height': 150,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    transparent: true,
    resizeable: false,
    show: false
  });
  notificationWindow.loadURL(path.normalize(path.join(__dirname, 'notification.html')));
  notificationWindowPositioner = new Positioner(notificationWindow);
  notificationWindowPositioner.move('bottomRight');
  notificationWindow.on('closed', () => {
    notificationWindow = null;
  });
  notificationWindow.webContents.openDevTools({
    detach: true
  });

  mainWindow = new BrowserWindow({
    'min-width': 200,
    'min-height': 200,
    width: 1180,
    height: 800,
    title: 'toshocat',
    frame: false,
    transparent: false,
    show: false
  });
  mainWindowPositioner = new Positioner(mainWindow);
  mainWindowPositioner.move('center');
  mainWindow.webContents.openDevTools({
    detach: true
  });

  appIcon = new Tray(path.join(__dirname, 'tray.png'));
  appIcon.on('click', restoreMainWindow);
  appIcon.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open Toshocat', click: restoreMainWindow },
    { label: 'Quit Toshocat', click: closeMainWindow }
  ]));
  appIcon.setToolTip('Toshocat');

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(path.normalize(path.join(__dirname, 'index.html')));
  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });
  mainWindow.webContents.on('new-window', (e) => {
    e.preventDefault();
  });
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
  });

  let notificationTimeout = null;
  ipc.on('scrobble', (event, data) => {
    clearTimeout(notificationTimeout);
    notificationWindow.show();
    notificationWindow.webContents.send('scrobble', data);
    notificationTimeout = setTimeout(() => {
      notificationWindow.hide();
    }, 5000);
  });
});
