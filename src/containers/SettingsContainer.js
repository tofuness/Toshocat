import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Settings from '../components/Settings';
import * as syncerActions from '../actions/syncer';

function mapStateToProps(state) {
  return {
    currentListName: state.currentListName
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, syncerActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
