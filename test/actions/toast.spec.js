import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect } from 'chai';

import * as actions from '../../src/actions/toast';
import * as actionTypes from '../../src/constants/actionTypes';

const mockStore = configureStore([thunk]);

describe('toast actions', () => {
  describe('destroyToast', () => {
    it('should fire remove action if a toastId is provided', () => {
      const expectedActions = [{
        id: 123,
        type: actionTypes.DESTROY_TOAST
      }];
      const store = mockStore();
      store.dispatch(actions.destroyToast(123));
      expect(store.getActions()).to.eql(expectedActions);
    });
    it('should not do anything if toast id is not provided', () => {
      const store = mockStore();
      expect(store.getActions()).to.eql([]);
    });
  });
  describe('crateToast', () => {
    it('should create a toast', () => {
      const toast = {
        id: 123,
        type: 'info',
        message: 'this is a toast message',
        timer: 0
      };

      const expectedActions = [{
        type: actionTypes.CREATE_TOAST,
        toast
      }];
      const store = mockStore();
      store.dispatch(actions.createToast(toast));
      expect(store.getActions()).to.eql(expectedActions);
    });
    it('should create a timed toast', (done) => {
      const toast = {
        id: 321,
        type: 'info',
        message: 'another one',
        timer: 10
      };

      const expectedActions = [{
        type: actionTypes.CREATE_TOAST,
        toast
      }, {
        id: 321,
        type: actionTypes.DESTROY_TOAST
      }];
      const store = mockStore();
      store.dispatch(actions.createToast(toast));
      setTimeout(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      }, 30);
    });
  });
  describe('updateToast', () => {
    const toast = {
      id: 321,
      type: 'info',
      message: 'another one',
      timer: 0
    };
    it('should update an existing toast', () => {
      const updatedToast = {
        id: 321,
        type: 'failure',
        message: 'new message',
        timer: 0
      };

      const expectedActions = [{
        type: actionTypes.CREATE_TOAST,
        toast
      }, {
        type: actionTypes.UPDATE_TOAST,
        toast: updatedToast
      }];

      const store = mockStore();
      store.dispatch(actions.createToast(toast));
      store.dispatch(actions.updateToast(updatedToast));
      expect(store.getActions()).to.eql(expectedActions);
    });
    it('should update an existing toast with timer', (done) => {
      const updatedToast = {
        id: 321,
        type: 'failure',
        message: 'new message',
        timer: 10
      };

      const expectedActions = [{
        type: actionTypes.CREATE_TOAST,
        toast
      }, {
        type: actionTypes.UPDATE_TOAST,
        toast: updatedToast
      }, {
        type: actionTypes.DESTROY_TOAST,
        id: 321
      }];

      const store = mockStore();
      store.dispatch(actions.createToast(toast));
      store.dispatch(actions.updateToast(updatedToast));
      setTimeout(() => {
        expect(store.getActions()).to.eql(expectedActions);
        done();
      }, 30);
    });
    it('should not do anything if toast id is not provided', () => {
      const store = mockStore();
      store.dispatch(actions.updateToast({}));
      expect(store.getActions()).to.eql([]);
    });
  });
});
