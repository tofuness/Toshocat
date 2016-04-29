import {
  SHOW_SERIES_REQUEST,
  SHOW_SERIES_SUCCESS,
  SHOW_SERIES_FAILURE,
  HIDE_SERIES,
  LOAD_SERIES_EPISODES_REQUEST,
  LOAD_SERIES_EPISODES_SUCCESS,
  LOAD_SERIES_EPISODES_FAILURE
} from '../constants/actionTypes';

import _ from 'lodash';
import request from 'superagent';
import settings from '../utils/settings';

/**
 * Shows modal with series information
 * @param  {String|Number} id MyAnimeList ID
 * @param  {String} type Either 'anime' or 'manga'
 * @return {Function}
 */
export function showSeries(id, type = 'anime', seriesData) {
  if (seriesData) {
    return (dispatch) => {
      dispatch({
        type: SHOW_SERIES_SUCCESS,
        series: seriesData
      });
    };
  }
  return (dispatch) => {
    dispatch({
      type: SHOW_SERIES_REQUEST
    });
    return new Promise((resolve, reject) => {
      request
      .get(`${settings.get('APIBase')}/${type}/${id}`)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: SHOW_SERIES_FAILURE
          });
          reject(err);
        } else {
          dispatch({
            type: SHOW_SERIES_SUCCESS,
            series: res.body
          });
          resolve(res.body);
        }
      });
    });
  };
}

/**
 * Loads additional episode information if it exists
 * @return {Function}
 */
export function loadEpisodes() {
  return (dispatch, getState) => {
    const { seriesVisible, currentSeries } = getState();
    if (seriesVisible && currentSeries.type === 'tv') {
      dispatch({
        type: LOAD_SERIES_EPISODES_REQUEST
      });
      return new Promise((resolve, reject) => {
        request
        .get(`${settings.get('APIBase')}/tvdb/episodes/${_.get(currentSeries, 'title_english.0') || currentSeries.title}`)
        .end((err, res) => {
          if (err || _.isEmpty(res.body)) {
            dispatch({
              type: LOAD_SERIES_EPISODES_FAILURE
            });
            reject(err);
          } else {
            dispatch({
              type: LOAD_SERIES_EPISODES_SUCCESS,
              episodes: res.body
            });
            resolve(res.body);
          }
        });
      });
    }
    return dispatch({
      type: LOAD_SERIES_EPISODES_FAILURE
    });
  };
}

/**
 * Hide series modal
 * @return {Object} Hide series action
 */
export function hideSeries() {
  return {
    type: HIDE_SERIES
  };
}
