import {
  SHOW_CALENDAR_REQUEST,
  SHOW_CALENDAR_FAILURE,
  SHOW_CALENDAR_SUCCESS
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
      type: SHOW_CALENDAR_REQUEST,
    });
    request
    .get(`${settings.get('APIBase')}/schedule`)
    .end((err, res) => {
      if (err) {
        dispatch({
          type: SHOW_CALENDAR_FAILURE
        });
      } else {
        dispatch({
          type: SHOW_CALENDAR_SUCCESS,
          calendar: res.body
        });
      }
    });
  };
}
