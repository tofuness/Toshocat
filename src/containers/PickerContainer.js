import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import PickerButton from '../components/PickerButton';
import * as listActions from '../actions/list';

function mapStateToProps(state) {
  return {
    currentList: state.currentList,
    series: state.currentSeries
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, listActions), dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return _.assign({}, stateProps, dispatchProps, ownProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PickerButton);
