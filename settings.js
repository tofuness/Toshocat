const Configstore = require('configstore');
const _ = require('lodash');

const settingsStore = new Configstore('toshocat-app');
const defaultSettings = {
  minimizeToTray: true,
  APIBase: 'https://dalian.toshocat.com',
  listName: 'default'
};

settingsStore.set(_.assign({}, defaultSettings, settingsStore.all));

module.exports = settingsStore;
