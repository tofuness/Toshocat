import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Explore from '../components/Explore';
import * as exploreActions from '../actions/explore';

function mapStateToProps(state) {
  return {
    featured: state.featured,
    collections: state.collections
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(exploreActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
