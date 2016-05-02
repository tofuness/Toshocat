import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ToastQueue from '../components/ToastQueue';

function mapStateToProps(state) {
  return {
    toastQueue: state.toastQueue
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastQueue);
