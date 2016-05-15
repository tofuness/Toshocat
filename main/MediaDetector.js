const _ = require('lodash');
const path = require('path');
const anitomy = require('anitomy-js');

const child_process = require('child_process');

class MediaDetector {
  scan() {
    return new Promise((resolve, reject) => {
      let scriptPath;
      if (process.env.NODE_ENV === 'development') {
        scriptPath = path.resolve(__dirname, '../bin/detect-media.ps1');
      } else {
        // Copied to a different location with `extraResources` field in package.json
        // in production. Can't execute files in asar archive
        scriptPath = path.resolve(__dirname, '../../../bin/detect-media.ps1');
      }
      child_process.execFile(
        'powershell',
        ['-NoProfile', '-ExecutionPolicy', 'Bypass', scriptPath],
        (err, stdout, stderr) => {
          if (stderr) {
            reject(stderr);
          } else {
            let media;
            try {
              media = JSON.parse(stdout);
            } catch (e) {
              media = [];
            }

            // We try and be consistent
            if (!_.isArray(media)) {
              media = [media];
            }

            if (!_.isEmpty(media)) {
              media = media.map((process) => {
                return _.assign({}, process, {
                  MainWindowTitle: process.MainWindowTitle.replace(/ \- VLC(.*)+/g, '')
                });
              });
              anitomy.parseAsync(_.map(media, 'MainWindowTitle'), (parsedMedia) => {
                resolve(parsedMedia);
              });
            } else {
              reject('no media found');
            }
          }
        }
      );
    });
  }
}

module.exports = MediaDetector;
