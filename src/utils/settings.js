export default (
  process.env.APP_ENV === 'browser' ?
    remote.require('../main/settings.js')
    : require('../../main/settings')
);
