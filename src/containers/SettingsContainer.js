import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Settings from '../components/Settings';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
