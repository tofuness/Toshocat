// Cannot be imported from renderer process directly!

const _ = require('lodash');
const path = require('path');
const execa = require('execa');

module.exports = {
  parse: (filenames, callback) => {
    const args = ['--name'];
    if (!_.isArray(filenames)) {
      args.push(filenames);
    } else {
      for (var i = 0; i < filenames.length; i++) {
        args.push(filenames[i]);
      }
    }
    /*
    A smart to maybe check for is if the filename
    doesn't contain any [] (or similar), we should just ignore it
    */
    execa(path.resolve(__dirname, '../../bin/anitomy-cli'), args)
    .then((result) => {
      callback(JSON.parse(result.stdout));
    })
    .catch(() => callback(false));
  }
};
