const _ = require('lodash');
const path = require('path');
const { app, ipcMain, Tray, Menu } = require('electron');

const Main = require('./MainWindow');
const Notification = require('./NotificationWindow');
const Detector = require('./MediaDetector');
const AppUpdater = require('./AppUpdater');

const settings = require('./settings');
const __DEV__ = (process.env.NODE_ENV === 'development');

if (require('electron-squirrel-startup')) {
  return;
}

app.on('ready', () => {
  console.log(`Toshocat ${app.getVersion()}`);

  // Main application window
  const main = new Main();
  if (__DEV__) {
    main.window.openDevTools({
      detach: true
    });
  }

  // Tray icon
  const tray = new Tray(path.resolve(__dirname, './app-icon.ico'));
  tray.on('click', () => {
    main.restore();
  });
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Open Toshocat',
      click: main.restore
    },
    {
      label: 'Quit Toshocat',
      click: app.quit
    }
  ]));
  tray.setToolTip('Toshocat');

  // After main window is closed
  main.window.on('closed', () => {
    tray.destroy();
    app.quit();
  });

  // Run auto updater
  if (!__DEV__) {
    const appUpdater = new AppUpdater(main);
    appUpdater.init();
  }

  // Notification/scrobble window
  const notification = new Notification();
  if (__DEV__) {
    notification.window.openDevTools({
      detach: true
    });
  }

  // Request scrobble
  let notificationTimeout;
  ipcMain.on('scrobble-request', (event, scrobbleData) => {
    notification.show();
    notification.window.webContents.send('scrobble-request', scrobbleData);
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      notification.hide();
    }, 11000);
  });

  // On update
  ipcMain.on('scrobble-confirm', (event, scrobbleData) => {
    main.window.webContents.send('scrobble-confirm', scrobbleData);
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      notification.hide();
    }, 400);
  });

  // Cancelled scrobble
  ipcMain.on('scrobble-cancel', () => {
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
      notification.hide();
    }, 400);
  });

  // Media detection
  let prevMedia = {};
  const detector = new Detector();

  // Detection and scrobble requesting
  const scrobble = () => {
    if (settings.get('mediaDetection')) {
      detector.scan()
      .then((parsedMedia) => {
        if (!_.isEqual(prevMedia, parsedMedia[0]) && !main.window.webContents.isLoading()) {
          main.window.webContents.send('media-detected', parsedMedia[0]);
          prevMedia = parsedMedia[0];
        }
        setTimeout(() => {
          scrobble();
        }, 2000);
      })
      .catch(() => {
        main.window.webContents.send('media-lost');
        prevMedia = {};
        setTimeout(() => {
          scrobble();
        }, 2000);
      });
    } else {
      main.window.webContents.send('media-lost');
      prevMedia = {};
      setTimeout(() => {
        scrobble();
      }, 2000);
    }
  };
  scrobble();
});
app.on('window-all-closed', () => {
  app.quit();
});
