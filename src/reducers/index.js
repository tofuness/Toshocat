import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import _ from 'lodash';

import * as listReducers from './list';
import * as searchReducers from './search';
import * as seriesReducers from './series';
import * as exploreReducers from './explore';
import * as calendarReducers from './calendar';
import * as scrobbleReducers from './scrobble';
import * as rssReducers from './rss';
import * as chartReducers from './chart';

// Assign, you smaht.
export default combineReducers(
  _.assign({},
    listReducers,
    searchReducers,
    seriesReducers,
    exploreReducers,
    calendarReducers,
    scrobbleReducers,
    rssReducers,
    chartReducers,
    {
      routing: routerReducer
    }
  )
);
