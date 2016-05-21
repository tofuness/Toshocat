import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Kicker from '../components/Kicker';
import * as syncerActions from '../actions/syncer';
import * as scrobbleActions from '../actions/scrobble';

function mapStateToProps(state) {
  return { currentScrobble: state.currentScrobble };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, scrobbleActions, syncerActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Kicker);
