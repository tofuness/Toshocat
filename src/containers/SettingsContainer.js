import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Settings from '../components/Settings';
import * as toastActions from '../actions/toast';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, toastActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
