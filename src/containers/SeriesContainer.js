import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Series from '../components/Series';
import { hideSeries, loadEpisodes } from '../actions/series';

function mapStateToProps(state) {
  return {
    series: state.currentSeries,
    loading: state.seriesLoading,
    visible: state.seriesVisible,
    episodes: state.currentSeriesEpisodes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideSeries, loadEpisodes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Series);
