const electron = require('electron');

const _ = require('lodash');
const path = require('path');
const Positioner = require('electron-positioner');
const settings = require('./settings');
const env = process.env.NODE_ENV;

const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

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

const execa = require('execa');
const anitomy = require('./src/utils/anitomy');

function detectMedia(callback) {
  if (!settings.get('mediaDetection')) return callback(false);
  execa.shell('powershell -NoProfile -ExecutionPolicy Bypass ./bin/detect-media.ps1')
  .then((result) => {
    let detectedMedia;
    try {
      detectedMedia = JSON.parse(result.stdout);
    } catch (e) {
      detectedMedia = [];
    }
    if (!_.isArray(detectedMedia)) detectedMedia = [detectedMedia];
    if (detectedMedia && detectedMedia.length) {
      anitomy.parse(_.chain(detectedMedia).get('0.MainWindowTitle')
      .replace(/ \- VLC(.*)+/g, '')
      .value(), (parsedData) => {
        callback(_.assign({}, parsedData[0], detectedMedia[0]));
      });
    } else {
      callback(false);
    }
  })
  .catch((err) => {
    console.log(err);
    callback(false);
  });
}

app.on('ready', () => {
  notificationWindow = new BrowserWindow({
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
  notificationWindow.loadURL(`file://${path.resolve(__dirname, './notification.html')}`);
  notificationWindowPositioner = new Positioner(notificationWindow);
  notificationWindowPositioner.move('bottomRight');
  notificationWindow.on('closed', () => {
    notificationWindow = null;
  });
  if (env !== 'production') {
    notificationWindow.webContents.openDevTools({
      detach: true
    });
  }

  mainWindow = new BrowserWindow({
    minWidth: 500,
    minHeight: 500,
    width: 1180,
    height: 800,
    title: 'toshocat',
    frame: false,
    transparent: false,
    backgroundColor: '#000',
    show: false
  });
  mainWindowPositioner = new Positioner(mainWindow);
  mainWindowPositioner.move('center');
  if (env !== 'production') {
    mainWindow.webContents.openDevTools({
      detach: true
    });
  }

  appIcon = new Tray(path.resolve(__dirname, './app-icon.ico'));
  appIcon.on('click', restoreMainWindow);
  appIcon.setContextMenu(Menu.buildFromTemplate([
    { label: 'Open Toshocat', click: restoreMainWindow },
    { label: 'Quit Toshocat', click: closeMainWindow }
  ]));
  appIcon.setToolTip('Toshocat');

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL(`file://${path.resolve(__dirname, './index.html')}`);
  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });
  mainWindow.webContents.on('new-window', (e) => {
    e.preventDefault();
  });

  let detectionTimeout = null;
  let lastParsedData = {};
  function detect() {
    detectMedia((parsedData) => {
      if (!_.isEqual(lastParsedData, parsedData)) {
        mainWindow.webContents.send(parsedData ? 'media-detected' : 'media-lost', parsedData);
      }
      lastParsedData = parsedData;
      detectionTimeout = setTimeout(() => {
        detect();
      }, 2000);
    });
  }
  // 'did-finish-load' runs everytime you press f5.
  // Need to clear interval to avoid this from hogging memory
  mainWindow.webContents.on('did-finish-load', () => {
    lastParsedData = {};
    clearTimeout(detectionTimeout);
    detect();
    mainWindow.show();
  });

  let notificationTimeout = null;
  function hideNotificationWindow() {
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      console.log('hide');
      notificationWindow.hide();
    }, 300);
  }

  ipcMain.on('scrobble-confirm', (event, data) => {
    mainWindow.webContents.send('scrobble-confirm', data);
    hideNotificationWindow();
  });

  ipcMain.on('scrobble-cancel', () => {
    hideNotificationWindow();
  });

  ipcMain.on('scrobble-request', (event, data) => {
    notificationWindow.show();
    notificationWindow.webContents.send('scrobble-request', data);

    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      notificationWindow.hide();
    }, 11000);
  });
});
