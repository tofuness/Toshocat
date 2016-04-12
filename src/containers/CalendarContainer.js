import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Calendar from '../components/Calendar';
import calendarSelectors from '../selectors/calendar';
import * as calendarActions from '../actions/calendar';
import * as seriesActions from '../actions/series';

function mapStateToProps(state) {
  return calendarSelectors(state);
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    _.assign({}, calendarActions, seriesActions),
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
