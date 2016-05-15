const { app } = require('electron');
module.exports = {
  isDev: app.getAppPath().includes('/node_modules/electron-prebuilt')
};
