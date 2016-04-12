import { expect } from 'chai';

import mockList from '../fixtures/list';
import * as reducers from '../../src/reducers/list';
import * as actionTypes from '../../src/constants/actionTypes';

import SyncerFactory from '../../src/syncers/SyncerFactory';

describe('list reducers', () => {
  describe('currentList', () => {
    let initialState = [];
    beforeEach(() => {
      initialState = [];
    });

    it('should return current list', () => {
      expect(reducers.currentList(mockList.list, {
        type: 'INVALID_ACTION_TYPE',
        currentList: []
      })).to.equal(mockList.list);
    });

    it('should return new list when loaded', () => {
      expect(reducers.currentList(initialState, {
        type: actionTypes.LOAD_LIST,
        currentList: mockList.list
      })).to.equal(mockList.list);

      expect(initialState).eql([]);
    });

    it('should return new list when a list item is added', () => {
      expect(reducers.currentList(initialState, {
        type: actionTypes.ADD_LIST_ITEM,
        currentList: mockList.list
      })).to.equal(mockList.list);

      expect(initialState).eql([]);
    });

    it('should return new list when a list item is removed', () => {
      expect(reducers.currentList(initialState, {
        type: actionTypes.REMOVE_LIST_ITEM,
        currentList: mockList.list
      })).to.equal(mockList.list);

      expect(initialState).eql([]);
    });

    it('should return new list when a list item is updated', () => {
      expect(reducers.currentList(initialState, {
        type: actionTypes.UPDATE_LIST_ITEM,
        currentList: mockList.list
      })).to.equal(mockList.list);

      expect(initialState).eql([]);
    });
  });

  describe('currentSyncer', () => {
    let currentSyncer = null;
    beforeEach(() => {
      currentSyncer = new SyncerFactory({
        username: 'jane',
        password: 'smith'
      }, 'MyAnimeList');
    });

    it('should return current syncer by default', () => {
      expect(reducers.currentSyncer(currentSyncer, {
        type: 'INVALID_ACTION_TYPE',
        syncer: 'INVALID_SYNCER'
      })).to.eql(currentSyncer);
    });

    it('should return new syncer on switch', () => {
      expect(reducers.currentSyncer(null, {
        type: actionTypes.SWITCH_SYNCER,
        syncer: currentSyncer
      })).to.eql(currentSyncer);
    });

    it('should return current syncer on switch failure', () => {
      expect(reducers.currentSyncer(currentSyncer, {
        type: actionTypes.SWITCH_SYNCER_FAILURE,
        syncer: 'INVALID_SYNCER'
      })).to.eql(currentSyncer);
    });
  });

  describe('listSearchQuery', () => {
    it('should return current search query by default', () => {
      expect(reducers.listSearchQuery('ikoku meiro', {
        type: 'INVALID_ACTION_TYPE',
        query: 'INVALID QUERY'
      })).to.equal('ikoku meiro');
    });

    it('should return new query', () => {
      expect(reducers.listSearchQuery('croisee', {
        type: actionTypes.SEARCH_LIST,
        query: 'naruto'
      })).to.equal('naruto');
    });
  });

  describe('listSortBy', () => {
    it('should return title by default', () => {
      expect(reducers.listSortBy(undefined, {
        type: 'INVALID_ACTION_TYPE',
        listSortBy: 'INVALID SORT PROPERTY'
      })).to.equal('title');
    });

    it('should return new sort property', () => {
      expect(reducers.listSortBy('title', {
        type: actionTypes.SORT_LIST,
        listSortBy: 'type'
      })).to.equal('type');
    });
  });

  describe('listSortOrder', () => {
    it('should return ascending by default', () => {
      expect(reducers.listSortOrder(undefined, {
        type: 'INVALID_ACTION_TYPE',
        listSortBy: 'INVALID SORT PROPERTY'
      })).to.equal('asc');
    });

    it('should return descending if sorted by same property twice', () => {
      expect(reducers.listSortOrder('asc', {
        type: actionTypes.SORT_LIST,
        prevListSortBy: 'title',
        listSortBy: 'title'
      })).to.equal('desc');
    });
  });

  describe('listFilterStatus', () => {
    it('should return current by default', () => {
      expect(reducers.listStatusFilter(undefined, {
        type: 'INVALID_ACTION_TYPE',
        status: 'INVALID STATUS'
      })).to.equal('current');
    });

    it('should return new status on filter', () => {
      expect(reducers.listStatusFilter('dropped', {
        type: actionTypes.FILTER_LIST_STATUS,
        status: 'planned'
      })).to.equal('planned');
    });
  });

  describe('currentListName', () => {
    it('should return current list name', () => {
      expect(reducers.currentListName('testListName', {
        type: 'INVALID_ACTION_TYPE'
      })).to.equal('testListName');
    });

    it('should return new list name', () => {
      expect(reducers.currentListName('oldListName', {
        type: actionTypes.UPDATE_CURRENT_LIST_NAME,
        currentListName: 'newListName'
      })).to.equal('newListName');
    });
  });
});
