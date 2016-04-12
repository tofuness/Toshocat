import './styles/main.scss';

require('velocity-animate');
require('velocity-animate/velocity.ui.js');
require('./utils/velocity-animations');

import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

import { createHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();
const history = createHistory();
syncHistoryWithStore(history, store);

ReactDOM.render(<Root store={store} />, document.getElementById('mount'));
