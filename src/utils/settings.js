export default (
  process.env.APP_ENV === 'browser' ?
    remote.require('./settings.js')
    : require('../../settings')
);
