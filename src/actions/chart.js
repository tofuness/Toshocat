import {
  LOAD_CHART_REQUEST,
  LOAD_CHART_SUCCESS,
  LOAD_CHART_FAILURE,
  SWITCH_SEASON
} from '../constants/actionTypes';

import request from 'superagent';
import settings from '../utils/settings';

export function loadChart() {
  return (dispatch, getState) => {
    const { currentSeason } = getState();
    dispatch({
      type: LOAD_CHART_REQUEST
    });
    return new Promise((resolve, reject) => {
      request
      .get(`${settings.get('APIBase')}/chart/${currentSeason}`)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: LOAD_CHART_FAILURE
          });
          reject(err);
        } else {
          dispatch({
            type: LOAD_CHART_SUCCESS,
            chart: res.body
          });
          resolve(res.body);
        }
      });
    });
  };
}

export function switchSeason(season) {
  return {
    type: SWITCH_SEASON,
    season
  };
}
