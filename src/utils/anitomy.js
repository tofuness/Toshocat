// Cannot be imported from renderer process directly
const _ = require('lodash');
const path = require('path');
module.exports = {
  parse: (childProcess, filenames, callback) => {
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
    childProcess.execFile(path.resolve(__dirname, '../../bin/anitomy-cli'), args, (err, stdout) => {
      if (err) {
        console.log(err);
        callback(false);
      } else {
        callback(JSON.parse(stdout));
      }
    });
  }
};
