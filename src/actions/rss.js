import {
  SHOW_RSS_REQUEST,
  SHOW_RSS_FAILURE,
  SHOW_RSS_SUCCESS,
  INVALID_RSS_URL,
  SWITCH_RSS_URL
} from '../constants/actionTypes';
import utils from '../utils';
import request from 'superagent';
import _ from 'lodash';

/**
 * Load RSS from current RSS url
 * @return {Promise} Request promise
 */
export function loadRSS() {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_RSS_REQUEST
    });
    const { RSSUrl } = getState();
    if (!RSSUrl) {
      return dispatch({
        type: SHOW_RSS_FAILURE,
      });
    }
    return new Promise((resolve, reject) => {
      request
      .get('https://rss2json.com/api.json')
      .query({ rss_url: RSSUrl })
      .end((err, res) => {
        if (!err) {
          dispatch({
            type: SHOW_RSS_SUCCESS,
            RSS: _.get(res.body, 'items') || []
          });
          resolve(res.body);
        } else {
          dispatch({
            type: SHOW_RSS_FAILURE
          });
          reject();
        }
      });
    });
  };
}

/**
 * Switch to another RSS url
 * @param  {String} url new url
 * @return {Object}     Action object
 */
export function switchRSS(url) {
  if (utils.isUrl(url)) {
    return {
      type: SWITCH_RSS_URL,
      RSSUrl: url
    };
  }
  return {
    type: INVALID_RSS_URL
  };
}
