import { expect } from 'chai';

import * as reducers from '../../src/reducers/calendar';
import * as actionTypes from '../../src/constants/actionTypes';

import mockSeries from '../fixtures/series';

describe('calendar reducers', () => {
  describe('currentCalendar', () => {
    it('should switch to loaded calendar', () => {
      expect(reducers.currentCalendar([], {
        type: actionTypes.LOAD_CALENDAR_SUCCESS,
        calendar: [mockSeries.series]
      })).to.eql([mockSeries.series]);
    });
    it('should return calendar by default', () => {
      expect(reducers.currentCalendar([mockSeries.series], {
        type: 'INVALID_ACTION',
        calendar: []
      })).to.eql([mockSeries.series]);
    });
  });
  describe('calendarIsLoading', () => {
    it('should return true on new request', () => {
      expect(reducers.calendarIsLoading(false, {
        type: actionTypes.LOAD_CALENDAR_REQUEST
      })).to.equal(true);
    });
    it('should return false after successful request', () => {
      expect(reducers.calendarIsLoading(true, {
        type: actionTypes.LOAD_CALENDAR_SUCCESS
      })).to.eql(false);
    });
    it('should return false after failed request', () => {
      expect(reducers.calendarIsLoading(true, {
        type: actionTypes.LOAD_CALENDAR_FAILURE
      })).to.eql(false);
    });
    it('should return loading state by default', () => {
      expect(reducers.calendarIsLoading(true, {
        type: 'INVALID_ACTION'
      })).to.eql(true);
      expect(reducers.calendarIsLoading(true, {
        type: 'INVALID_ACTION'
      })).to.eql(true);
    });
  });
});
