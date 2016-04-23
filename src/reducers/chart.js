import {
  LOAD_CHART_SUCCESS,
  SWITCH_SEASON
} from '../constants/actionTypes';

export function currentSeason(state = '', action = {}) {
  switch (action.type) {
    case SWITCH_SEASON:
      return action.season;
    default:
      return state;
  }
}

export function currentChart(state = [], action = {}) {
  switch (action.type) {
    case LOAD_CHART_SUCCESS:
      return action.chart;
    default:
      return state;
  }
}
