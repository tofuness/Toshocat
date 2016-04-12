import {
  SHOW_CALENDAR_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  calendar: []
};

export function currentCalendar(state = initialState.calendar, action = {}) {
  switch (action.type) {
    case SHOW_CALENDAR_SUCCESS:
      return action.calendar;
    default:
      return state;
  }
}
