import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Settings from '../components/Settings';
import * as toastActions from '../actions/toast';
import * as listActions from '../actions/list';

function mapStateToProps(state) {
  return {
    currentListName: state.currentListName
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, toastActions, listActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
