import {
  LOAD_LIST,
  SORT_LIST,
  SEARCH_LIST,
  UPDATE_LIST_ITEM,
  ADD_LIST_ITEM,
  REMOVE_LIST_ITEM,
  FILTER_LIST_STATUS,
  SWITCH_LIST_FAILURE,
  UPDATE_CURRENT_LIST_NAME,
  SWITCH_SYNCER,
  SWITCH_SYNCER_FAILURE,
  SYNC_LIST
} from '../constants/actionTypes';
import request from 'superagent';
import moment from 'moment';
import _ from 'lodash';

import Syncer from '../syncers/Syncer';

import toshoStore from '../utils/store';
import settings from '../utils/settings';

/**
 * Loads list with currentListName into Store
 * @return {Function}
 */
export function loadList() {
  return (dispatch, getState) => {
    const { currentListName } = getState();
    dispatch({
      type: LOAD_LIST,
      currentList: toshoStore.getList(currentListName)
    });
  };
}

/**
 * Switch to another list
 * @param  {String} listName List name
 * @return {Object|Function}
 */
export function switchList(listName) {
  if (!listName) {
    return { type: SWITCH_LIST_FAILURE };
  }
  settings.set({ listName });
  return (dispatch) => {
    dispatch({
      type: UPDATE_CURRENT_LIST_NAME,
      currentListName: listName
    });
    dispatch(loadList());
  };
}

/**
 * Syncs new list with a list stored in local storage.
 * Makes sure that old fields are not naively removed.
 * @param  {String} listName List name
 * @param  {Array} newList   List
 * @return {Function}
 */
export function syncList(listName, newList) {
  return (dispatch) => {
    const unsyncedList = toshoStore.getList(listName);
    const syncedList = _.map(newList, (entry) => {
      // Check if we have this entry since before
      const unsyncedEntry = _.find(unsyncedList, (o) => {
        return o._id === entry._id;
      });

      if (unsyncedEntry) {
        return _.merge({}, unsyncedEntry, entry);
      }
      return entry;
    });

    toshoStore.saveList(listName, syncedList);

    dispatch({
      type: SYNC_LIST,
      syncedList
    });
  };
}

/**
 * Switch to new syncer
 * @param  {Syncer} syncer Valid subclass of Syncer
 * @return {Object}        Action object
 */
export function switchSyncer(syncer) {
  if (!(syncer instanceof Syncer)) {
    return { type: SWITCH_SYNCER_FAILURE };
  }
  return {
    type: SWITCH_SYNCER,
    syncer
  };
}

/**
 * Remove current syncer if there is any
 * @return {Object}
 */
export function removeSyncer() {
  return {
    type: SWITCH_SYNCER,
    syncer: null
  };
}

/**
 * Sets status to filter list by
 * @param  {String} status E.g 'current'
 * @return {Object} Filter action
 */
export function filterListByStatus(status) {
  return {
    type: FILTER_LIST_STATUS,
    status
  };
}

/**
 * Search list and show match results only
 * @param  {String} query String that should match list entry titles
 * @return {Object}       Search action
 */
export function searchList(query) {
  return {
    type: SEARCH_LIST,
    query
  };
}

/**
 * Sort current visible list by a property
 * @param  {String} nextListSortBy List item property
 * @return {Function}
 */
export function sortListBy(nextListSortBy) {
  return (dispatch, getState) => {
    const { listSortBy } = getState();
    dispatch({
      type: SORT_LIST,
      prevListSortBy: listSortBy,
      listSortBy: nextListSortBy
    });
  };
}

/**
 * Add series to list
 * @param {Object} item List entry
 * @return {Function}
 */
export function addItem(item) {
  return (dispatch, getState) => {
    const { currentList, currentListName, currentSyncer } = getState();
    if (currentSyncer) {
      currentSyncer.addListItem(item);
    }
    const updatedList = [item, ...currentList];
    toshoStore.saveList(currentListName, updatedList);
    dispatch({
      type: ADD_LIST_ITEM,
      currentList: updatedList
    });
  };
}

/**
 * Updates list with new entry, replacing old one
 * @param  {Object} item new list entry
 * @return {Function}
 */
function _updateItem(item) {
  return (dispatch, getState) => {
    const { currentList, currentListName } = getState();
    const updatedList = currentList.map((listItem) => {
      return listItem._id === item._id ? item : listItem;
    });
    toshoStore.saveList(currentListName, updatedList);
    dispatch({
      type: UPDATE_LIST_ITEM,
      currentList: updatedList
    });
  };
}

/**
 * Fetches new information if series is currently airing
 * and updates the list with new entry.
 * @param  {Object} item new list entry
 * @return {Function}
 */
export function updateItem(item) {
  return (dispatch, getState) => {
    const { currentSyncer } = getState();
    if (currentSyncer) {
      currentSyncer.updateListItem(item);
    }
    // We always run a normal update to make sure the list entry
    // transitions correctly. New info can come in later after the user
    // has received a response to their action.
    dispatch(_updateItem(item));
    if (item.last_updated === undefined || moment().diff(item.last_updated, 'hours') > 24) {
      // E.g. if we are missing total episodes info etc
      return new Promise((resolve) => {
        request
        .get(`${settings.get('APIBase')}/anime/${item.mal_id}`)
        .end((err, res) => {
          if (err) {
            dispatch(_updateItem(item));
          } else {
            dispatch(
              _updateItem(
                _.merge({}, item, res.body)
              )
            );
          }
          resolve();
        });
      });
    }
    return Promise.resolve();
  };
}

/**
 * Update list entry if exists; Add if it doesn't.
 * Use this if in doubt.
 * @param  {Object} item List entry
 * @return {Function}
 */
export function upsertItem(item) {
  return (dispatch, getState) => {
    const { currentList } = getState();
    const alreadyExists = _.find(currentList, (listItem) => {
      return listItem._id === item._id;
    });
    if (alreadyExists) {
      return dispatch(updateItem(item));
    }
    return dispatch(addItem(_.assign({}, {
      item: {
        item_status_text: 'Current',
        item_status: 'current',
        item_progress: 0,
        item_rating: 0
      }
    }, item)));
  };
}

/**
 * Removes list entries with matching _id
 * @param  {ObjectId} id ObjectId from MongoDB.
 * @return {Function}
 */
export function removeItem(id) {
  return (dispatch, getState) => {
    const { currentList, currentListName, currentSyncer } = getState();
    const updatedList = currentList.filter((listItem) => {
      if (id === listItem._id && currentSyncer) {
        currentSyncer.removeListItem(listItem);
      }
      return id !== listItem._id;
    });
    toshoStore.saveList(currentListName, updatedList);
    dispatch({
      type: REMOVE_LIST_ITEM,
      currentList: updatedList
    });
  };
}
