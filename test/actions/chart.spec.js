import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import * as actionTypes from '../../src/constants/actionTypes';
import * as actions from '../../src/actions/chart';
import settings from '../../main/settings';

const mockStore = configureStore([thunk]);

describe('chart actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('loadChart', () => {
    it('should load chart', (done) => {
      const expectedResponse = [{
        title: 'Dantalian no Shoka'
      }];

      const expectedActions = [{
        type: actionTypes.LOAD_CHART_REQUEST,
      }, {
        type: actionTypes.LOAD_CHART_SUCCESS,
        chart: expectedResponse
      }];

      const getState = {
        currentSeason: 'winter-2015'
      };

      nock(settings.get('APIBase'))
      .get('/chart/winter-2015')
      .reply(200, expectedResponse);

      const store = mockStore(getState);
      store.dispatch(actions.loadChart())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    it('should handle error', () => {
      const expectedActions = [{
        type: actionTypes.LOAD_CHART_REQUEST,
      }, {
        type: actionTypes.LOAD_CHART_FAILURE
      }];

      const getState = {
        currentSeason: 'winter-2015'
      };

      nock(settings.get('APIBase'))
      .get('/chart/winter-2015')
      .reply(500, {});

      const store = mockStore(getState);
      return store.dispatch(actions.loadChart())
      .catch(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    });
  });

  describe('switchSeason', () => {
    it('it should switch season', () => {
      const expectedActions = [{
        type: actionTypes.SWITCH_SEASON,
        season: 'new-season'
      }];

      const store = mockStore({});
      store.dispatch(actions.switchSeason('new-season'));
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});
