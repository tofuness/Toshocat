import {
  SET_SCROBBLE_WAIT,
  SET_SCROBBLE_SUCCESS
} from '../constants/actionTypes';
import settings from '../utils/settings';

import _ from 'lodash';
import request from 'superagent';
import jw from '../../vendor/jw';

/**
 * Given a list of series and a title, scores each of them with jw distance
 * @param  {Array} items  Array of objects
 * @param  {String} title Anime title
 * @return {Array}        Collection sorted by score in descending order
 */
function _scoreItems(items, title) {
  return _.chain(items)
  .map((series) => {
    const jwScores = [0];
    ['title', 'title_english', 'title_synonyms'].map((property) => {
      if (_.get(series, property)) {
        _.flattenDeep([series[property]]).map((seriesTitle) => {
          jwScores.push(jw(seriesTitle, title));
          return seriesTitle;
        });
      }
      return property;
    });
    return _.assign({}, series, { score: Math.max(...jwScores) });
  })
  .sortBy((series) => series.score)
  .value().reverse();
}

/**
 * Scrobble anime
 * @param  {Object} data Data object from anitomy
 * @return {Function}
 */
export function scrobble(data) {
  return (dispatch, getState) => {
    const { latestScrobble, currentList } = getState();
    if (!_.isEqual(latestScrobble, data)) {
      request
      .get(`${settings.get('APIBase')}/anime/search/${data.animeTitle}`)
      .end((err, res) => {
        if (!err && res.body.length) {
          const matchesFromList = _scoreItems(currentList, data.animeTitle);
          const matchestFromSearch = _scoreItems(res.body, data.animeTitle);
          if (matchesFromList.length && matchestFromSearch[0]._id === matchesFromList[0]._id) {
            console.log(matchestFromSearch[0].title + ' is a match');
          } else {
            console.log(matchestFromSearch);
            console.log(`might be ${matchestFromSearch[0].title} ${matchestFromSearch[0].mal_id}`);
          }
        }
      });
    }
  };
}

/*

          ipc.send('scrobble', {
            seriesName: _.get(parsedData, 'animeTitle'),
            seriesEpisode: _.get(parsedData, 'episodeNumber')
          });
 */
