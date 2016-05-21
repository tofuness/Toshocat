const Configstore = require('configstore');
const _ = require('lodash');

const settingsStore = new Configstore(
  process.env.NODE_ENV === 'development' ?
    'toshocat-dev'
    : 'toshocat-prod'
);
const defaultSettings = {
  minimizeToTray: true,
  APIBase: 'https://dalian.toshocat.com',
  listName: 'toshocat',
  allowMetrics: true,
  mediaDetection: true,
  runOnStartup: true,
  minimizedOnStartup: false,
  tenRatingScale: false,
  headerOrder: [{
    name: 'Title',
    property: 'title'
  }, {
    name: 'Progress',
    property: 'item.item_progress'
  }, {
    name: 'Rating',
    property: 'item.item_rating'
  }, {
    name: 'Type',
    property: 'type'
  }]
};

settingsStore.set(_.merge({}, defaultSettings, settingsStore.all));

module.exports = settingsStore;
