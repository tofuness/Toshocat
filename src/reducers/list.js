import {
  LOAD_LIST,
  SORT_LIST,
  SEARCH_LIST,
  FILTER_LIST_STATUS,
  ADD_LIST_ITEM,
  REMOVE_LIST_ITEM,
  UPDATE_LIST_ITEM,
  SWITCH_SYNCER,
  UPDATE_CURRENT_LIST_NAME,
  UPDATE_HEADER_ORDER
} from '../constants/actionTypes';

import Immutable from 'seamless-immutable';
import _ from 'lodash';

import settings from '../utils/settings';
import toshoStore from '../utils/store';

/*
  Different initial states depending on if this is run inside electron or
  not. We want to avoid errors with toshoStore.getList(), because
  it cannot be stubbed.
 */
let initialState = {
  listSearchQuery: '',
  listSortBy: 'title',
  listSortOrder: 'asc',
  listStatusFilter: 'current',
  currentSyncer: null,
};
if (process.env.APP_ENV === 'browser') {
  initialState = _.merge(initialState, {
    currentListName: settings.get('listName'),
    currentList: toshoStore.getList(settings.get('listName'))
  });
} else {
  initialState = _.merge(initialState, {
    currentListName: settings.get('listName'),
    currentList: []
  });
}

const initialHeaderOrder = [{
  name: 'Title',
  property: 'title'
}, {
  name: 'Progress',
  property: 'item.item_progress'
}, {
  name: 'Rating',
  property: 'item.item_rating'
}, {
  name: 'Type',
  property: 'type'
}];

initialState = Immutable(initialState);

export function currentList(state = initialState.currentList, action = {}) {
  switch (action.type) {
    case LOAD_LIST:
      return action.currentList;
    case ADD_LIST_ITEM:
      return action.currentList;
    case REMOVE_LIST_ITEM:
      return action.currentList;
    case UPDATE_LIST_ITEM:
      return action.currentList;
    default:
      return state;
  }
}

export function currentSyncer(state = initialState.currentSyncer, action = {}) {
  switch (action.type) {
    case SWITCH_SYNCER:
      return action.syncer;
    default:
      return state;
  }
}

export function listSearchQuery(state = initialState.listSearchQuery, action = {}) {
  switch (action.type) {
    case SEARCH_LIST:
      return action.query;
    default:
      return state;
  }
}

export function listSortBy(state = initialState.listSortBy, action = {}) {
  switch (action.type) {
    case SORT_LIST:
      return action.listSortBy;
    default:
      return state;
  }
}

export function listSortOrder(state = initialState.listSortOrder, action = {}) {
  switch (action.type) {
    case SORT_LIST:
      if (action.prevListSortBy === action.listSortBy) {
        return state === 'asc' ? 'desc' : 'asc';
      }
      return 'asc';
    default:
      return state;
  }
}

export function listStatusFilter(state = initialState.listStatusFilter, action = {}) {
  switch (action.type) {
    case FILTER_LIST_STATUS:
      return action.status;
    default:
      return state;
  }
}

export function headerOrder(state = initialHeaderOrder, action = {}) {
  switch (action.type) {
    case UPDATE_HEADER_ORDER:
      return action.order;
    default:
      return state;
  }
}

export function currentListName(state = initialState.currentListName, action = {}) {
  switch (action.type) {
    case UPDATE_CURRENT_LIST_NAME:
      return action.currentListName;
    default:
      return state;
  }
}
