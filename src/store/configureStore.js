import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';

const finalCreatedStore = compose(
  applyMiddleware(thunkMiddleware),
  DevTools.instrument()
)(createStore);

export default function configureStore() {
  return finalCreatedStore(rootReducer);
}
