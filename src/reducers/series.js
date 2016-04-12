import {
  SHOW_SERIES_SUCCESS,
  SHOW_SERIES_FAILURE,
  SHOW_SERIES_REQUEST,
  HIDE_SERIES
} from '../constants/actionTypes';

export function currentSeries(state = {}, action = {}) {
  switch (action.type) {
    case SHOW_SERIES_REQUEST:
      return {};
    case SHOW_SERIES_SUCCESS:
      return action.series;
    default:
      return state;
  }
}

export function seriesLoading(state = false, action = {}) {
  switch (action.type) {
    case SHOW_SERIES_SUCCESS:
      return false;
    case SHOW_SERIES_FAILURE:
      return false;
    case SHOW_SERIES_REQUEST:
      return true;
    default:
      return state;
  }
}

export function seriesVisible(state = false, action = {}) {
  switch (action.type) {
    case SHOW_SERIES_SUCCESS:
      return true;
    case SHOW_SERIES_REQUEST:
      return state;
    case HIDE_SERIES:
      return false;
    default:
      return state;
  }
}
