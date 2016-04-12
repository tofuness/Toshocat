import {
  SHOW_SERIES_REQUEST,
  SHOW_SERIES_SUCCESS,
  SHOW_SERIES_FAILURE,
  HIDE_SERIES
} from '../constants/actionTypes';

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
          reject();
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
 * Hide series modal
 * @return {Object} Hide series action
 */
export function hideSeries() {
  return {
    type: HIDE_SERIES
  };
}
