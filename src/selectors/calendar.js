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
    .filter((series) => {
      return (new Date() - new Date(series.anime.premiere_date)) / 1000 < 14515200;
    })
    .groupBy((series) => {
      const airdate = moment(new Date(series.airdate));
      return airdate.format('YYYYMMDD');
    })
    .values()
    .slice(0, 15)
    .value();
  }
);

export const calendarIsLoading = (state) => state.calendarIsLoading;

export default createStructuredSelector({
  currentCalendar,
  calendarIsLoading
});
