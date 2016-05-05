import {
  LOAD_CALENDAR_SUCCESS
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
