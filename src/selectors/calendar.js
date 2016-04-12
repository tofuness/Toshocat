import { createSelector, createStructuredSelector } from 'reselect';
import moment from 'moment-timezone';
import _ from 'lodash';

export const currCalendar = (state) => {
  return state.currentCalendar;
};

export const currentCalendar = createSelector(
  [currCalendar],
  (calendar) => {
    return _.chain(calendar)
    .groupBy((series) => {
      const airdate = moment(new Date(series.airdate));
      return airdate.format('YYYYMMDD');
    })
    .values()
    .value();
  }
);

export default createStructuredSelector({
  currentCalendar
});
