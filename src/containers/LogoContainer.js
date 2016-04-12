import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Logo from '../components/Logo';
import * as listActions from '../actions/list';

function mapStateToProps(state) {
  return {
    currentListName: state.currentListName
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, listActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logo);
