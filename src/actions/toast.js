import {
  CREATE_TOAST,
  DESTROY_TOAST,
  UPDATE_TOAST
} from '../constants/actionTypes';
import uuid from 'node-uuid';

export function destroyToast(toastId) {
  if (toastId) {
    return {
      type: DESTROY_TOAST,
      id: toastId
    };
  }
}

export function createToast({ id = '', type = 'info', message = '', timer = 0 }) {
  return (dispatch) => {
    const newToastId = id || uuid.v4();
    dispatch({
      type: CREATE_TOAST,
      toast: {
        id: newToastId,
        type,
        message,
        timer
      }
    });
    if (timer > 0) {
      setTimeout(() => {
        dispatch(destroyToast(newToastId));
      }, timer);
    }
  };
}

export function updateToast({ id = '', type = 'info', message = '', timer = 0 }) {
  return (dispatch) => {
    if (id) {
      dispatch({
        type: UPDATE_TOAST,
        toast: {
          id,
          type,
          message,
          timer
        }
      });
      if (timer > 0) {
        setTimeout(() => {
          dispatch(destroyToast(id));
        }, timer);
      }
    }
  };
}
