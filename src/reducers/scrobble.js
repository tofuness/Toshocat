import {
  SCROBBLE_REQUEST,
  SCROBBLE_SUCCESS
} from '../constants/actionTypes';

export function currentScrobble(state = {}, action = {}) {
  switch (action.type) {
    case SCROBBLE_SUCCESS:
      return action.scrobble;
    case SCROBBLE_REQUEST:
      return state;
    default:
      return state;
  }
}
