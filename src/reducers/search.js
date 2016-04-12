import {
  SET_SEARCH_QUERY,
  SET_SEARCH_TYPE,
  SET_SEARCH_SORTBY,
  SHOW_SEARCH_REQUEST,
  SHOW_SEARCH_SUCCESS,
  SHOW_SEARCH_FAILURE
} from '../constants/actionTypes';

const initialState = {
  searchQuery: '',
  searchType: 'anime',
  searchSortBy: 'popularity',
  searchResults: [],
  searchLoading: false
};

export function searchQuery(state = initialState.searchQuery, action = {}) {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return action.searchQuery;
    default:
      return state;
  }
}

export function searchType(state = initialState.searchType, action = {}) {
  switch (action.type) {
    case SET_SEARCH_TYPE:
      return action.searchType;
    default:
      return state;
  }
}

export function searchSortBy(state = initialState.searchSortBy, action = {}) {
  switch (action.type) {
    case SET_SEARCH_SORTBY:
      return action.searchSortBy;
    default:
      return state;
  }
}

export function searchResults(state = initialState.searchResults, action = {}) {
  switch (action.type) {
    case SHOW_SEARCH_REQUEST:
      return state;
    case SHOW_SEARCH_SUCCESS:
      return action.searchResults;
    case SHOW_SEARCH_FAILURE:
      return [];
    default:
      return state;
  }
}

export function searchLoading(state = initialState.searchLoading, action = {}) {
  switch (action.type) {
    case SHOW_SEARCH_REQUEST:
      return true;
    case SHOW_SEARCH_SUCCESS:
      return false;
    case SHOW_SEARCH_FAILURE:
      return false;
    default:
      return state;
  }
}
