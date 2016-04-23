import {
  LOAD_CALENDAR_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  calendar: []
};

export function currentCalendar(state = initialState.calendar, action = {}) {
  switch (action.type) {
    case LOAD_CALENDAR_SUCCESS:
      return action.calendar;
    default:
      return state;
  }
}
