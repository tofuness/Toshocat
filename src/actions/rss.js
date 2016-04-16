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
      .get('https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100')
      .query({ q: RSSUrl })
      .end((err, res) => {
        if (!err) {
          console.log(JSON.parse(res.text));
          dispatch({
            type: SHOW_RSS_SUCCESS,
            RSS: _.get(JSON.parse(res.text), 'responseData.feed.entries') || []
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
