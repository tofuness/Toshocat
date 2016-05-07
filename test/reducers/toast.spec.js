import { expect } from 'chai';

import * as reducers from '../../src/reducers/toast';
import * as actionTypes from '../../src/constants/actionTypes';

describe('toast reducers', () => {
  describe('toastQueue', () => {
    const randomToast = {
      id: 'never really used',
      type: 'loading',
      message: 'kappa',
      timer: 0
    };
    const toast = {
      id: 123,
      type: 'info',
      message: 'key to success',
      timer: 0
    };
    const updatedToast = {
      id: 123,
      type: 'success',
      message: 'another one',
      timer: 0
    };
    describe('on create', () => {
      it('should append a new toast', () => {
        expect(reducers.toastQueue([randomToast], {
          type: actionTypes.CREATE_TOAST,
          toast
        })).to.eql([randomToast, toast]);
        expect(reducers.toastQueue([], {
          type: actionTypes.CREATE_TOAST,
          toast
        })).to.eql([toast]);
      });
      it('should update toast if id already exists', () => {
        expect(reducers.toastQueue([toast, randomToast], {
          type: actionTypes.CREATE_TOAST,
          toast: updatedToast
        })).to.eql([updatedToast, randomToast]);
      });
    });
    it('should remove toast if it exists', () => {
      expect(reducers.toastQueue([toast], {
        type: actionTypes.DESTROY_TOAST,
        id: 123
      })).to.eql([]);
      expect(reducers.toastQueue([toast, randomToast], {
        type: actionTypes.DESTROY_TOAST,
        id: 123
      })).to.eql([randomToast]);
    });
    it('should update existing toast', () => {
      expect(reducers.toastQueue([toast], {
        type: actionTypes.UPDATE_TOAST,
        toast: updatedToast
      })).to.eql([updatedToast]);
    });
    it('should return state on default', () => {
      expect(reducers.toastQueue([toast], {
        type: 'INVALID_ACTION',
        toast: {}
      })).to.eql([toast]);
    });
  });
});
