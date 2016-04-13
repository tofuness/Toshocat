import {
  SHOW_RSS_REQUEST,
  SHOW_RSS_FAILURE,
  SHOW_RSS_SUCCESS,
  INVALID_RSS_URL,
  SWITCH_RSS_URL
} from '../constants/actionTypes';

export function RSSUrl(state = '', action = {}) {
  switch (action.type) {
    case SWITCH_RSS_URL:
      return action.RSSUrl;
    case INVALID_RSS_URL:
      return state;
    default:
      return state;
  }
}

export function RSS(state = [], action = {}) {
  switch (action.type) {
    case SHOW_RSS_REQUEST:
      return state;
    case SHOW_RSS_SUCCESS:
      return action.RSS;
    case SHOW_RSS_FAILURE:
      return state;
    default:
      return state;
  }
}
