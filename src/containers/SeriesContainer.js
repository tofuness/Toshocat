import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Series from '../components/Series';
import { hideSeries } from '../actions/series';

function mapStateToProps(state) {
  return {
    series: state.currentSeries,
    loading: state.seriesLoading,
    visible: state.seriesVisible
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideSeries }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Series);
