import {
  SHOW_COLLECTIONS_REQUEST,
  SHOW_COLLECTIONS_FAILURE,
  SHOW_COLLECTIONS_SUCCESS,
  SHOW_FEATURED_REQUEST,
  SHOW_FEATURED_FAILURE,
  SHOW_FEATURED_SUCCESS
} from '../constants/actionTypes';

import request from 'superagent';
import settings from '../utils/settings';

/**
 * Load series collections from API
 * @return {Function}
 */
export function loadCollections() {
  return (dispatch) => {
    dispatch({
      type: SHOW_COLLECTIONS_REQUEST
    });
    return new Promise((resolve, reject) => {
      request
      .get(`${settings.get('APIBase')}/explore/collections`)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: SHOW_COLLECTIONS_FAILURE
          });
          reject(err);
        } else {
          dispatch({
            type: SHOW_COLLECTIONS_SUCCESS,
            collections: res.body
          });
          resolve(res.body);
        }
      });
    });
  };
}

export function loadFeatured() {
  return (dispatch) => {
    dispatch({
      type: SHOW_FEATURED_REQUEST
    });
    return new Promise((resolve, reject) => {
      request
      .get(`${settings.get('APIBase')}/explore/featured`)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: SHOW_FEATURED_FAILURE,
            err
          });
          reject(err);
        } else {
          dispatch({
            type: SHOW_FEATURED_SUCCESS,
            collections: res.body
          });
          resolve(res.body);
        }
      });
    });
  };
}
