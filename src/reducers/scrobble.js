import {
  SCROBBLE_REQUEST,
  SCROBBLE_SUCCESS,
  SCROBBLE_CLEAR
} from '../constants/actionTypes';

export function currentScrobble(state = {}, action = {}) {
  switch (action.type) {
    case SCROBBLE_REQUEST:
      return action.scrobble;
    case SCROBBLE_SUCCESS:
      return state;
    case SCROBBLE_CLEAR:
      return {};
    default:
      return state;
  }
}
