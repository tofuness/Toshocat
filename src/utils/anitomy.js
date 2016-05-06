// Cannot be imported from renderer process directly!

const _ = require('lodash');
const anitomy = require('anitomy-js');

module.exports = {
  parse: (filenames, callback) => {
    if (filenames !== undefined && filenames !== null && filenames.length) {
      let allFilenames = [];
      if (!_.isArray(filenames)) {
        allFilenames = [filenames];
      } else {
        allFilenames = filenames;
      }
      anitomy.parseAsync(allFilenames, callback);
    } else {
      callback(false);
    }
  }
};
