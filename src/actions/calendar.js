import {
  LOAD_CALENDAR_REQUEST,
  LOAD_CALENDAR_FAILURE,
  LOAD_CALENDAR_SUCCESS
} from '../constants/actionTypes';

import request from 'superagent';
import settings from '../utils/settings';

/**
 * Load calendar data
 * @return {Function}
 */
export function loadCalendar() {
  return (dispatch) => {
    dispatch({
      type: LOAD_CALENDAR_REQUEST,
    });
    request
    .get(`${settings.get('APIBase')}/schedule`)
    .end((err, res) => {
      if (err) {
        dispatch({
          type: LOAD_CALENDAR_FAILURE
        });
      } else {
        dispatch({
          type: LOAD_CALENDAR_SUCCESS,
          calendar: res.body
        });
      }
    });
  };
}
