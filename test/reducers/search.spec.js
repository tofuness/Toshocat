import { expect } from 'chai';

import * as reducers from '../../src/reducers/search';
import * as actionTypes from '../../src/constants/actionTypes';

const mockResults = [{
  title: 'Dantalian no Shoka'
}];

describe('search reducers', () => {
  describe('searchQuery', () => {
    it('should return new search query', () => {
      expect(reducers.searchQuery('oldQuery', {
        type: actionTypes.SET_SEARCH_QUERY,
        searchQuery: 'newQuery'
      })).to.equal('newQuery');
    });
    it('should return current search query', () => {
      expect(reducers.searchQuery('oldQuery', {
        type: 'INVALID_ACTION_TYPE',
        searchQuery: 'newQuery'
      })).to.equal('oldQuery');
    });
  });

  describe('searchType', () => {
    it('should return new search type', () => {
      expect(reducers.searchType('anime', {
        type: actionTypes.SET_SEARCH_TYPE,
        searchType: 'manga'
      })).to.equal('manga');
    });

    it('should return current search type', () => {
      expect(reducers.searchType('anime', {
        type: 'INVALID_ACTION_TYPE',
        searchType: 'manga'
      })).to.equal('anime');
    });
  });

  describe('searchSortBy', () => {
    it('should return new property to sort by', () => {
      expect(reducers.searchSortBy('popularity', {
        type: actionTypes.SET_SEARCH_SORTBY,
        searchSortBy: 'relevance'
      })).to.equal('relevance');
    });

    it('should return current property to sort by', () => {
      expect(reducers.searchSortBy('popularity', {
        type: 'INVALID_ACTION_TYPE',
        searchSortBy: 'recent'
      })).to.equal('popularity');
    });

    it('should return a default property to sort by', () => {
      expect(reducers.searchSortBy(undefined, {
        type: 'INVALID_ACTION_TYPE',
        searchSortBy: 'recent'
      })).to.equal('popularity');
    });
  });

  describe('searchResults', () => {
    it('should be empty by default', () => {
      expect(reducers.searchResults(undefined, {
        type: 'INVALID_ACTION_TYPE',
        searchResults: [123]
      })).to.eql([]);
    });

    it('should return current results on request', () => {
      expect(reducers.searchResults(mockResults, {
        type: actionTypes.SHOW_SEARCH_REQUEST,
        searchResults: []
      })).to.eql(mockResults);
    });

    it('should return results on success', () => {
      expect(reducers.searchResults([], {
        type: actionTypes.SHOW_SEARCH_SUCCESS,
        searchResults: mockResults
      })).to.eql(mockResults);
    });

    it('should return empty on failure', () => {
      expect(reducers.searchResults(mockResults, {
        type: actionTypes.SHOW_SEARCH_FAILURE,
        searchResults: [123]
      })).to.eql([]);
    });
  });

  describe('searchLoading', () => {
    it('should not be loading by default', () => {
      expect(reducers.searchLoading(undefined, {
        type: 'INVALID_ACTION_TYPE'
      })).to.equal(false);
    });

    it('should return true on request', () => {
      expect(reducers.searchLoading(false, {
        type: actionTypes.SHOW_SEARCH_REQUEST
      })).to.equal(true);
    });

    it('should return false on success', () => {
      expect(reducers.searchLoading(true, {
        type: actionTypes.SHOW_SEARCH_SUCCESS
      })).to.equal(false);
    });

    it('should return false on failure', () => {
      expect(reducers.searchLoading(true, {
        type: actionTypes.SHOW_SEARCH_FAILURE
      })).to.equal(false);
    });
  });
});
