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
      .then(() => {
        done(new Error('This promise is supposed to be rejected'));
      })
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

  describe('loadEpisodes', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should load episode data for current series', (done) => {
      const expectedEpisodesResponse = [{
        episode_number: 3,
        episode_title: 'The One Who Upholds Tradition',
        image_url: 'https://google.com'
      }];

      nock(settings.get('APIBase'))
      .get('/tvdb/episodes/Kuma%20Miko')
      .reply(200, expectedEpisodesResponse);

      const getState = {
        seriesVisible: true,
        currentSeries: {
          title: 'Kuma Miko',
          type: 'tv'
        }
      };
      const expectedActions = [{
        type: actionTypes.LOAD_SERIES_EPISODES_REQUEST
      }, {
        type: actionTypes.LOAD_SERIES_EPISODES_SUCCESS,
        episodes: expectedEpisodesResponse
      }];
      const store = mockStore(getState);
      store
      .dispatch(actions.loadEpisodes())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should not load data if series is visible', () => {
      const getState = {
        seriesVisible: false,
        currentSeries: {
          title: 'Kuma Miko'
        }
      };
      const expectedActions = [{
        type: actionTypes.LOAD_SERIES_EPISODES_FAILURE
      }];
      const store = mockStore(getState);
      store.dispatch(actions.loadEpisodes());
      expect(store.getActions()).to.eql(expectedActions);
    });
    it('should not load data if series is not of type \'tv\'', () => {
      const getState = {
        seriesVisible: true,
        currentSeries: {
          title: 'Kuma Miko'
        }
      };
      const expectedActions = [{
        type: actionTypes.LOAD_SERIES_EPISODES_FAILURE
      }];
      const store = mockStore(getState);
      store.dispatch(actions.loadEpisodes());
      expect(store.getActions()).to.eql(expectedActions);
    });
    it('should dispatch failure if no episodes were found', (done) => {
      nock(settings.get('APIBase'))
      .get('/tvdb/episodes/Kuma%20Miko')
      .reply(200, []);

      const getState = {
        seriesVisible: true,
        currentSeries: {
          title: 'Kuma Miko',
          type: 'tv'
        }
      };
      const expectedActions = [{
        type: actionTypes.LOAD_SERIES_EPISODES_REQUEST
      }, {
        type: actionTypes.LOAD_SERIES_EPISODES_FAILURE
      }];
      const store = mockStore(getState);
      store
      .dispatch(actions.loadEpisodes())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
    it('should dispatch failure if an error occured', (done) => {
      nock(settings.get('APIBase'))
      .get('/tvdb/episodes/Kuma%20Miko')
      .reply(500, []);

      const getState = {
        seriesVisible: true,
        currentSeries: {
          title: 'Kuma Miko',
          type: 'tv'
        }
      };
      const expectedActions = [{
        type: actionTypes.LOAD_SERIES_EPISODES_REQUEST
      }, {
        type: actionTypes.LOAD_SERIES_EPISODES_FAILURE
      }];
      const store = mockStore(getState);
      store
      .dispatch(actions.loadEpisodes())
      .then(() => {
        done(new Error('This promise is supposed to be rejected'));
      })
      .catch(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
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
