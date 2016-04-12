import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RSSReader from '../components/RSSReader';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RSSReader);
