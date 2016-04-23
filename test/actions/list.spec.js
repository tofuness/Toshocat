import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import _ from 'lodash';

import mockList from '../fixtures/list';
import toshoStore from '../../src/utils/store';
import settings from '../../src/utils/settings';
import * as actions from '../../src/actions/list';
import * as actionTypes from '../../src/constants/actionTypes';

import SyncerFactory from '../../src/syncers/SyncerFactory';

const mockStore = configureStore([thunk]);

describe('list actions', () => {
  beforeEach(() => {
    sinon.stub(toshoStore, 'getList').returns(mockList.list);
    sinon.stub(toshoStore, 'saveList').returns(undefined);
    sinon.stub(settings, 'set').returns(true);
  });

  afterEach(() => {
    toshoStore.getList.restore();
    toshoStore.saveList.restore();
    settings.set.restore();
    nock.cleanAll();
  });

  describe('syncList', () => {
    it('should old list with new list', () => {
      toshoStore.getList.restore();
      sinon.stub(toshoStore, 'getList').returns([
        {
          _id: 'someid',
          item: {
            item_notes: 'Old notes'
          }
        }
      ]);
      const getState = {};
      const expectedActions = [{
        type: actionTypes.SYNC_LIST,
        syncedList: [
          {
            _id: 'someid',
            item: {
              item_notes: 'Old notes',
              item_progress: 123
            }
          }
        ]
      }];
      const store = mockStore(getState);
      store.dispatch(actions.syncList('dummylist', [
        {
          _id: 'someid',
          item: {
            item_notes: undefined,
            item_progress: 123
          }
        }
      ]));
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('switchSyncer', () => {
    let malSyncer;
    beforeEach(() => {
      malSyncer = new SyncerFactory({
        username: 'john',
        password: 'smith'
      }, 'MyAnimeList');
    });
    it('should switch syncer', () => {
      const getState = {};
      const expectedActions = [{
        type: actionTypes.SWITCH_SYNCER,
        syncer: malSyncer
      }];

      const store = mockStore(getState);
      store.dispatch(actions.switchSyncer(malSyncer));
      expect(store.getActions()).to.eql(expectedActions);
    });

    it('should not switch syncer if provided syncer is not derived from Syncer', () => {
      const getState = { currentSyncer: malSyncer };
      const expectedActions = [{
        type: actionTypes.SWITCH_SYNCER_FAILURE
      }];

      const store = mockStore(getState);
      store.dispatch(actions.switchSyncer('invalid syncer'));
      expect(store.getActions()).to.eql(expectedActions);
      expect(store.getState()).to.eql(getState);
    });
  });

  describe('removeSyncer', () => {
    it('should set current syncer to null', () => {
      const getState = { currentSyncer: 'somesyncer' };
      const expectedActions = [{
        type: actionTypes.SWITCH_SYNCER,
        syncer: null
      }];
      const store = mockStore(getState);
      store.dispatch(actions.removeSyncer());
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('switchList', () => {
    it('should switch list when list name is provided', () => {
      const getState = { currentList: [] };
      const expectedActions = [{
        type: actionTypes.UPDATE_CURRENT_LIST_NAME,
        currentListName: 'hummingbird'
      }, {
        type: actionTypes.LOAD_LIST,
        currentList: mockList.list
      }];
      const store = mockStore(getState);
      store.dispatch(actions.switchList('hummingbird'));
      expect(toshoStore.getList.calledOnce).to.equal(true);
      expect(settings.set.calledOnce).to.equal(true);
      expect(store.getActions()).to.eql(expectedActions);
    });

    it('should not switch list if no list name is provided', () => {
      const getState = { currentList: [{ _id: 'notEmpty' }] };
      const expectedActions = [{
        type: actionTypes.SWITCH_LIST_FAILURE
      }];
      const store = mockStore(getState);
      store.dispatch(actions.switchList());
      expect(toshoStore.getList.callCount).to.equal(0);
      expect(settings.set.callCount).to.equal(0);
      expect(store.getActions()).to.eql(expectedActions);
      expect(store.getState()).to.eql(getState);
    });
  });

  describe('loadList', () => {
    it('should load a list', () => {
      const getState = { currentList: [] };
      const expectedActions = [{
        type: actionTypes.LOAD_LIST,
        currentList: mockList.list
      }];
      const store = mockStore(getState);
      store.dispatch(actions.loadList());
      expect(toshoStore.getList.calledOnce).to.equal(true);
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('sortListBy', () => {
    it('should change the property to sort list by', () => {
      const getState = { listSortBy: 'title' };
      const expectedActions = [{
        type: actionTypes.SORT_LIST,
        prevListSortBy: 'title',
        listSortBy: 'type'
      }];
      const store = mockStore(getState);
      store.dispatch(actions.sortListBy('type'));
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('filterListByStatus', () => {
    it('should filter list by status', () => {
      const getState = {};
      const expectedActions = [{
        type: actionTypes.FILTER_LIST_STATUS,
        status: 'dropped'
      }];
      const store = mockStore(getState);
      store.dispatch(actions.filterListByStatus('dropped'));
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('searchList', () => {
    it('query string should be set', () => {
      const getState = { listSeachQuery: '' };
      const expectedActions = [{
        type: actionTypes.SEARCH_LIST,
        query: 'shoka'
      }];
      const store = mockStore(getState);
      store.dispatch(actions.searchList('shoka'));
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('addItem', () => {
    it('should add an item to current list', () => {
      const getState = { currentList: [] };
      const expectedActions = [{
        type: actionTypes.ADD_LIST_ITEM,
        currentList: [mockList.item]
      }];
      const store = mockStore(getState);
      store.dispatch(actions.addItem(mockList.item));
      expect(toshoStore.saveList.calledOnce).to.equal(true);
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('updateItem', () => {
    it('should update an item in current list', () => {
      const getState = { currentList: [mockList.item] };
      const updatedListItem = _.assign({}, mockList.item, {
        item: {
          item_status_text: 'NewStatus',
          item_status: 'newstatus',
          item_rating: 0,
          item_progress: 0
        }
      });
      const expectedActions = [{
        type: actionTypes.UPDATE_LIST_ITEM,
        currentList: [updatedListItem]
      }];
      const store = mockStore(getState);
      store.dispatch(actions.updateItem(updatedListItem));
      expect(toshoStore.saveList.calledOnce).to.equal(true);
      expect(store.getActions()).to.eql(expectedActions);
    });

    it('should not update non-existing list entry', () => {
      const getState = { currentList: [mockList.item] };
      const nonExistingListItem = {
        _id: 'non-existing _id',
        item: {
          item_status_text: 'NewStatus',
          item_status: 'newstatus',
          item_rating: 0,
          item_progress: 0
        }
      };
      const expectedActions = [{
        type: actionTypes.UPDATE_LIST_ITEM,
        currentList: [mockList.item]
      }];
      const store = mockStore(getState);
      store.dispatch(actions.updateItem(nonExistingListItem));
      expect(toshoStore.saveList.calledOnce).to.equal(true);
      expect(store.getActions()).to.eql(expectedActions);
    });

    // Redux-thunk support broekn
    it('should fetch new series data if series was last updated more than 24 hours ago', (done) => {
      const getState = { currentList: [mockList.outdated] };
      const updatedListItem = _.assign({}, mockList.outdated, { random_field: 'random' });
      const expectedListItem = _.assign({}, updatedListItem, { title: 'Erased' });
      const requestResult = {
        title: 'Erased'
      };

      nock(settings.get('APIBase'))
      .get('/anime/123')
      .reply(200, requestResult);

      const expectedActions = [{
        type: actionTypes.UPDATE_LIST_ITEM,
        currentList: [updatedListItem]
      }, {
        type: actionTypes.UPDATE_LIST_ITEM,
        currentList: [expectedListItem]
      }];

      const store = mockStore(getState);
      store
      .dispatch(actions.updateItem(updatedListItem))
      .then(() => {
        assert.strictEqual(2, toshoStore.saveList.callCount);
        expect(store.getActions()).to.eql(expectedActions);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });

    it('should NOT fetch new series data if it has been updated in the last 24 hours', (done) => {
      const getState = { currentList: [mockList.upToDate] };
      const updatedListItem = _.assign({}, mockList.upToDate, { random_field: 'random' });
      const expectedActions = [{
        type: actionTypes.UPDATE_LIST_ITEM,
        currentList: [updatedListItem]
      }];

      const store = mockStore(getState);
      store.dispatch(actions.updateItem(updatedListItem)).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      });
    });
  });

  describe('upsertItem', () => {
    it('should add item if it does not exist', () => {
      const getState = { currentList: mockList.list };
      const expectedActions = [{
        type: actionTypes.ADD_LIST_ITEM,
        currentList: [mockList.item, ...mockList.list]
      }];
      const store = mockStore(getState);
      store.dispatch(actions.upsertItem(mockList.item));
      expect(toshoStore.saveList.calledOnce).to.equal(true);
      expect(store.getActions()).to.eql(expectedActions);
    });

    it('should update item if it already exists', () => {
      const getState = { currentList: [{ _id: '123' }] };
      const expectedActions = [{
        type: actionTypes.UPDATE_LIST_ITEM,
        currentList: [{ _id: '123', title: 'Keepo' }]
      }];
      const store = mockStore(getState);
      store.dispatch(actions.upsertItem({ _id: '123', title: 'Keepo' }));
      expect(toshoStore.saveList.calledOnce).to.equal(true);
      expect(store.getActions()).to.eql(expectedActions);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from current list', () => {
      const getState = { currentList: mockList.list };
      const expectedActions = [{
        type: actionTypes.REMOVE_LIST_ITEM,
        currentList: [mockList.list[1]]
      }];
      const store = mockStore(getState);
      store.dispatch(actions.removeItem(mockList.list[0]._id));
      expect(toshoStore.saveList.calledOnce).to.equal(true);
      expect(store.getActions()).to.eql(expectedActions);
    });

    it('should not remove non-existing list entry', () => {
      const getState = { currentList: mockList.list };
      const expectedActions = [{
        type: actionTypes.REMOVE_LIST_ITEM,
        currentList: mockList.list
      }];
      const store = mockStore(getState);
      store.dispatch(actions.removeItem('non-existing _id'));
      expect(toshoStore.saveList.calledOnce).to.equal(true);
      expect(store.getActions()).to.eql(expectedActions);
    });
  });
});
