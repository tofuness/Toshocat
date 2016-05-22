import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import ListItem from '../components/ListItem';
import listSelectors from '../selectors/list';
import * as listActions from '../actions/list';
import * as seriesActions from '../actions/series';

function mapStateToProps(state) {
  return listSelectors(state);
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, listActions, seriesActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
