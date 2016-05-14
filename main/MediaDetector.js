const _ = require('lodash');
const execa = require('execa');
const anitomy = require('anitomy-js');

class MediaDetector {
  scan() {
    return new Promise((resolve, reject) => {
      execa.shell('powershell -NoProfile -ExecutionPolicy Bypass ./bin/detect-media.ps1')
      .then((response) => {
        let media;
        try {
          media = JSON.parse(response.stdout);
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
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }
}

module.exports = MediaDetector;
