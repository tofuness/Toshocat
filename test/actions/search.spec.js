import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { expect } from 'chai';

import * as actionTypes from '../../src/constants/actionTypes';
import * as actions from '../../src/actions/search';
import settings from '../../settings';

const mockStore = configureStore([thunk]);

describe('search actions', () => {
  describe('doSearchRequest', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('should search for series', (done) => {
      const getState = {
        searchResults: [],
        searchQuery: 'dantalian',
        searchType: 'anime',
        searchSortBy: 'popularity'
      };
      // Mock request
      const expectedSearchResult = [{
        _id: '562696cbfd1db921d7955710',
        title: 'Dantalian no Shoka'
      }];
      nock(settings.get('APIBase'))
      .get('/anime/search/dantalian%20sortby:popularity')
      .reply(200, expectedSearchResult);

      const expectedActions = [{
        type: actionTypes.SHOW_SEARCH_REQUEST
      }, {
        type: actionTypes.SHOW_SEARCH_SUCCESS,
        searchResults: expectedSearchResult
      }];

      const store = mockStore(getState);
      store
      .dispatch(actions.doSearchRequest())
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    });
    
    it('should fail search for series', (done) => {
      const getState = {
        searchResults: [],
        searchQuery: 'dantalian',
        searchType: 'anime',
        searchSortBy: 'popularity'
      };
      // Mock request
      nock(settings.get('APIBase'))
      .get('/anime/search/dantalian%20sortby:popularity')
      .reply(500, {});

      const expectedActions = [{
        type: actionTypes.SHOW_SEARCH_REQUEST
      }, {
        type: actionTypes.SHOW_SEARCH_FAILURE
      }];

      const store = mockStore(getState);
      store
      .dispatch(actions.doSearchRequest())
      .catch(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    });
  });

  describe('updateSearchQuery', () => {
    it('should set search query string', () => {
      const getState = { searchQuery: '' };
      const expectedActions = [{
        type: actionTypes.SET_SEARCH_QUERY,
        searchQuery: 'dantalian'
      }];
      const store = mockStore(getState);
      store.dispatch(actions.setSearchQuery('dantalian'));
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('setSearchType', () => {
    it('should set search type', () => {
      const getState = { searchType: 'anime' };
      const expectedActions = [{
        type: actionTypes.SET_SEARCH_TYPE,
        searchType: 'manga'
      }];
      const store = mockStore(getState);
      store.dispatch(actions.setSearchType('manga'));
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('setSearchSortBy', () => {
    it('should set a property to sort by', () => {
      const getState = { searchSortBy: 'popularity' };
      const expectedActions = [{
        type: actionTypes.SET_SEARCH_SORTBY,
        searchSortBy: 'relevance'
      }];
      const store = mockStore(getState);
      store.dispatch(actions.setSearchSortBy('relevance'));
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});
