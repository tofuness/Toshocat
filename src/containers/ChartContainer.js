import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Chart from '../components/Chart';
import * as chartActions from '../actions/chart';

function mapStateToProps(state) {
  return {
    currentChart: state.currentChart
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, chartActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
