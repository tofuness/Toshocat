import { expect } from 'chai';

import * as reducers from '../../src/reducers/chart';
import * as actionTypes from '../../src/constants/actionTypes';

describe('chart reducers', () => {
  describe('currentChart', () => {
    it('should switch to new chart', () => {
      expect(reducers.currentChart([], {
        type: actionTypes.LOAD_CHART_SUCCESS,
        chart: [{ title: 'newChart' }]
      })).to.eql([{ title: 'newChart' }]);
    });
    it('should return current chart', () => {
      expect(reducers.currentChart([{ title: 'oldChart' }], {
        type: 'INVALID_ACTION',
        chart: [{ title: 'randomChart' }],
      })).to.eql([{ title: 'oldChart' }]);
    });
  });
  describe('currentSeason', () => {
    it('should switch to new season', () => {
      expect(reducers.currentSeason('oldSeason', {
        type: actionTypes.SWITCH_SEASON,
        season: 'newSeason'
      })).to.equal('newSeason');
    });
    it('should return current season', () => {
      expect(reducers.currentSeason('oldSeason', {
        type: 'INVALID_ACTION',
        season: 'randomSeason'
      })).to.equal('oldSeason');
    });
  });
});
