import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { expect } from 'chai';

import * as actionTypes from '../../src/constants/actionTypes';
import * as actions from '../../src/actions/explore';
import settings from '../../settings';

const mockStore = configureStore([thunk]);

describe('explore actions', () => {
  describe('loadCollections', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should load collections', (done) => {
      const expectedCollectionsResult = [{
        title: 'Fantasy Game World',
        last_updated: '1 Jan, 2015'
      }];

      nock(settings.get('APIBase'))
      .get('/explore/collections')
      .reply(200, expectedCollectionsResult);

      const getState = {};
      const expectedActions = [{
        type: actionTypes.SHOW_COLLECTIONS_REQUEST
      }, {
        type: actionTypes.SHOW_COLLECTIONS_SUCCESS,
        collections: expectedCollectionsResult
      }];

      const store = mockStore(getState);
      store
      .dispatch(actions.loadCollections())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    });
  });

  describe('loadFeatured', () => {
    it('should load featured series', (done) => {
      done();
    });
  });
});
