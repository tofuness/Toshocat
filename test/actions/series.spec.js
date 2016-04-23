import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { expect } from 'chai';

import * as actionTypes from '../../src/constants/actionTypes';
import * as actions from '../../src/actions/series';
import settings from '../../settings';
const mockStore = configureStore([thunk]);

describe('series actions', () => {
  describe('showSeries', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should fetch series and display it', (done) => {
      const expectedSeriesResult = {
        _id: '562696cbfd1db921d7955710',
        title: 'Dantalian no Shoka'
      };
      nock(settings.get('APIBase'))
      .get('/anime/123')
      .reply(200, expectedSeriesResult);

      const getState = { series: [] };
      const expectedActions = [{
        type: actionTypes.SHOW_SERIES_REQUEST
      }, {
        type: actionTypes.SHOW_SERIES_SUCCESS,
        series: expectedSeriesResult
      }];
      const store = mockStore(getState);
      store
      .dispatch(actions.showSeries(123))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    it('should fail to fetch series and display error', (done) => {
      nock(settings.get('APIBase'))
      .get('/anime/123')
      .reply(500, {});

      const getState = { series: [] };
      const expectedActions = [{
        type: actionTypes.SHOW_SERIES_REQUEST
      }, {
        type: actionTypes.SHOW_SERIES_FAILURE
      }];
      const store = mockStore(getState);
      store
      .dispatch(actions.showSeries(123))
      .catch(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    });

    it('should skip the request and return series data immediately if provided', () => {
      const expectedSeriesResult = {
        title: 'One Piece'
      };
      const getState = { series: [] };
      const expectedActions = [{
        type: actionTypes.SHOW_SERIES_SUCCESS,
        series: expectedSeriesResult
      }];
      const store = mockStore(getState);
      store.dispatch(actions.showSeries(123, 'manga', { title: 'One Piece' }));
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('hideSeries', () => {
    it('should hide series modal', () => {
      const getState = { seriesVisible: true };
      const expectedActions = [{
        type: actionTypes.HIDE_SERIES
      }];
      const store = mockStore(getState);
      store.dispatch(actions.hideSeries());
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});
