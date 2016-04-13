import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import nock from 'nock';

import * as actions from '../../src/actions/rss';
import * as actionTypes from '../../src/constants/actionTypes';

const mockStore = configureStore([thunk]);

describe('rss actions', () => {
  describe('loadRSS', () => {
    it('should load RSS', (done) => {
      const getState = {
        RSSUrl: 'http://www.nyaa.se/?page=rss&cats=1_37&filter=2'
      };

      const expectedResponse = { items: [] };
      const expectedActions = [{
        type: actionTypes.SHOW_RSS_REQUEST
      }, {
        type: actionTypes.SHOW_RSS_SUCCESS,
        RSS: expectedResponse.items
      }];

      nock('https://rss2json.com')
      .get('/api.json')
      .query({ rss_url: getState.RSSUrl })
      .reply(200, expectedResponse);

      const store = mockStore(getState);
      store
      .dispatch(actions.loadRSS())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    });

    it('should fail if no RSS url exist in store', () => {
      const getState = {};
      const expectedActions = [{
        type: actionTypes.SHOW_RSS_REQUEST
      }, {
        type: actionTypes.SHOW_RSS_FAILURE
      }];
      const store = mockStore(getState);
      store.dispatch(actions.loadRSS());
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('switchRSS', () => {
    it('should switch to new RSS url', () => {
      const expectedActions = [{
        type: actionTypes.SWITCH_RSS_URL,
        RSSUrl: 'http://www.nyaa.se/?page=rss&cats=1_37&filter=2'
      }];
      const store = mockStore({});
      store.dispatch(actions.switchRSS(expectedActions[0].RSSUrl));
      expect(store.getActions()).to.eql(expectedActions);
    });

    it('should not allow invalid urls', () => {
      const expectedActions = [{
        type: actionTypes.INVALID_RSS_URL
      }];
      const store = mockStore({});
      store.dispatch(actions.switchRSS('INVALID_URL'));
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});
