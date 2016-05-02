import {
  CREATE_TOAST,
  UPDATE_TOAST,
  DESTROY_TOAST
} from '../constants/actionTypes';

export function toastQueue(state = [], action = {}) {
  switch (action.type) {
    case CREATE_TOAST: {
      const exists = state.find((toast) => {
        return toast.id === action.toast.id;
      });
      // If exists, we just update the old one. Otherwise we just create a new one.
      return exists ? state.map((toast) => {
        return toast.id === action.toast.id ? action.toast : toast;
      }) : [...state, action.toast];
    }
    case UPDATE_TOAST:
      return state.map((toast) => {
        return toast.id === action.toast.id ? action.toast : toast;
      });
    case DESTROY_TOAST:
      return state.filter((toast) => {
        return toast.id !== action.id;
      });
    default:
      return state;
  }
}
