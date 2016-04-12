import {
  SHOW_FEATURED_REQUEST,
  SHOW_FEATURED_FAILURE,
  SHOW_FEATURED_SUCCESS,
  SHOW_COLLECTIONS_REQUEST,
  SHOW_COLLECTIONS_FAILURE,
  SHOW_COLLECTIONS_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  featured: [],
  collections: []
};

export function featured(state = initialState.featured, action = {}) {
  switch (action.type) {
    case SHOW_FEATURED_SUCCESS:
      return action.featured;
    case SHOW_FEATURED_FAILURE:
      return state;
    case SHOW_FEATURED_REQUEST:
      return state;
    default:
      return state;
  }
}

export function collections(state = initialState.collections, action = {}) {
  switch (action.type) {
    case SHOW_COLLECTIONS_SUCCESS:
      return action.collections;
    case SHOW_COLLECTIONS_FAILURE:
      return state;
    case SHOW_COLLECTIONS_REQUEST:
      return state;
    default:
      return state;
  }
}
