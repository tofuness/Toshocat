import {
  SET_SCROBBLE_WAIT,
  SET_SCROBBLE_SUCCESS
} from '../constants/actionTypes';

export function latestScrobble(state = {}, action = {}) {
  switch (action.type) {
    case SET_SCROBBLE_SUCCESS:
      return action.newScrobble;
    case SET_SCROBBLE_WAIT:
      return state;
    default:
      return state;
  }
}
