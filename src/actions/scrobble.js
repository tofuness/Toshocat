import {
  SCROBBLE_REQUEST,
  SCROBBLE_SUCCESS,
  SCROBBLE_CLEAR
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
 * Shows notification window and asks user to confirm the scrobble
 * @param  {Object} data Data object from anitomy
 * @return {Function}
 */
export function requestScrobble(data) {
  return (dispatch, getState) => {
    const { currentScrobble, currentList } = getState();
    if (!_.isEqual(currentScrobble, data)) {
      request
      .get(`${settings.get('APIBase')}/anime/search/${data.animeTitle}`)
      .end((err, res) => {
        const matchesFromList = _scoreItems(currentList, data.animeTitle);
        if (!err && res.body.length) {
          const matchestFromSearch = _scoreItems(res.body, data.animeTitle);
          // If best scored series from list and server are equal, assume we have a match
          dispatch({
            type: SCROBBLE_REQUEST,
            scrobble: {
              series: matchestFromSearch[0],
              ...data
            }
          });
          ipcRenderer.send('scrobble-request', {
            series: matchestFromSearch[0],
            ...data
          });
        } else if (matchesFromList.length) {
          dispatch({
            type: SCROBBLE_REQUEST,
            scrobble: {
              series: matchesFromList[0],
              ...data
            }
          });
          ipcRenderer.send('scrobble-request', {
            series: matchesFromList[0],
            ...data
          });
        }
      });
    }
  };
}

export function clearScrobble() {
  return {
    type: SCROBBLE_CLEAR
  };
}
