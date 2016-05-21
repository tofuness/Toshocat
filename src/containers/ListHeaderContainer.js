import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import ListHeader from '../components/ListHeader';
import listSelectors from '../selectors/list';
import * as listActions from '../actions/list';

function mapStateToProps(state) {
  return listSelectors(state);
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, listActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListHeader);
