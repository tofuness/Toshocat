import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import Search from '../components/Search';
import * as listActions from '../actions/list';
import * as searchActions from '../actions/search';
import { showSeries } from '../actions/series';

function mapStateToProps(state) {
  return {
    searchType: state.searchType,
    searchQuery: state.searchQuery,
    searchSortBy: state.searchSortBy,
    searchLoading: state.searchLoading,
    searchResults: state.searchResults,
    currentList: state.currentList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(_.assign({}, listActions, searchActions, { showSeries }), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
