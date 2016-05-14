const Configstore = require('configstore');
const _ = require('lodash');

const settingsStore = new Configstore('toshocat-app');
const defaultSettings = {
  minimizeToTray: true,
  APIBase: 'https://dalian.toshocat.com',
  listName: 'toshocat',
  allowMetrics: true,
  mediaDetection: true,
  runOnStartup: true,
  minimizedOnStartup: false
};

settingsStore.set(_.merge({}, defaultSettings, settingsStore.all));

module.exports = settingsStore;
