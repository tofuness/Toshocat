import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Logo from '../components/Logo';
import * as listActions from '../actions/list';
import * as toastActions from '../actions/toast';

function mapStateToProps(state) {
  return {
    currentListName: state.currentListName
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, listActions, toastActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logo);
