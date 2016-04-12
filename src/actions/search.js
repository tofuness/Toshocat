import {
  SET_SEARCH_TYPE,
  SET_SEARCH_QUERY,
  SET_SEARCH_SORTBY,
  SHOW_SEARCH_REQUEST,
  SHOW_SEARCH_FAILURE,
  SHOW_SEARCH_SUCCESS
} from '../constants/actionTypes';

import request from 'superagent';
import settings from '../utils/settings';

/**
 * Sends a request to API with the query we have built
 * @return {Function}
 */
export function doSearchRequest() {
  return (dispatch, getState) => {
    const { searchQuery, searchType, searchSortBy } = getState();
    dispatch({
      type: SHOW_SEARCH_REQUEST
    });
    return new Promise((resolve, reject) => {
      request
      .get(`${settings.get('APIBase')}/${searchType}/search/${searchQuery} sortby:${searchSortBy}`)
      .end((err, res) => {
        if (err) {
          dispatch({
            type: SHOW_SEARCH_FAILURE
          });
          reject();
        } else {
          dispatch({
            type: SHOW_SEARCH_SUCCESS,
            searchResults: res.body
          });
          resolve(res.body);
        }
      });
    });
  };
}

/**
 * Set search type
 * @param {String} searchType anime or manga
 * @return {Object} Action for setting search type
 */
export function setSearchType(searchType) {
  return {
    type: SET_SEARCH_TYPE,
    searchType
  };
}

/**
 * Set proerty that the search results should be sorted by
 * @param {String} searchSortBy popularity, revelance or recent
 * @retrun {Object} Action for setting sort order
 */
export function setSearchSortBy(searchSortBy) {
  return {
    type: SET_SEARCH_SORTBY,
    searchSortBy
  };
}

/**
 * Updates the search query string
 * @param  {String} query
 * @return {Object} Action for setting search query
 */
export function setSearchQuery(query) {
  return {
    type: SET_SEARCH_QUERY,
    searchQuery: query
  };
}
