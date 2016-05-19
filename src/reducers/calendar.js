import {
  LOAD_CALENDAR_REQUEST,
  LOAD_CALENDAR_SUCCESS,
  LOAD_CALENDAR_FAILURE
} from '../constants/actionTypes';
import Immutable from 'seamless-immutable';

let initialState = {
  calendar: []
};
initialState = Immutable(initialState);

export function currentCalendar(state = initialState.calendar, action = {}) {
  switch (action.type) {
    case LOAD_CALENDAR_SUCCESS:
      return action.calendar;
    default:
      return state;
  }
}

export function calendarIsLoading(state = false, action = {}) {
  switch (action.type) {
    case LOAD_CALENDAR_REQUEST:
      return true;
    case LOAD_CALENDAR_SUCCESS:
      return false;
    case LOAD_CALENDAR_FAILURE:
      return false;
    default:
      return state;
  }
}
