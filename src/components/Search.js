import React, { Component, PropTypes } from 'react';

import SearchResult from './SearchResult';
import SearchSettings from './SearchSettings';

class Search extends Component {
  componentDidMount() {
    // Arbitrary range larger than usual search strings
    this.refs.searchInput.setSelectionRange(1000, 1000);
  }
  onChange = (e) => {
    this.props.setSearchQuery(e.target.value);
  }
  // It makes sense to do the search on keyDown because it feels more responsive
  onKeyDown = (e) => {
    switch (e.key) {
      case 'Escape':
        this.props.setSearchQuery('');
        break;
      case 'Enter':
        this.props.doSearchRequest();
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div className="search">
        <input
          autoFocus
          type="text"
          className="search-input"
          placeholder="Search for something..."
          value={this.props.searchQuery}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          ref="searchInput"
        />
        <SearchSettings
          searchType={this.props.searchType}
          searchSortBy={this.props.searchSortBy}
          setSearchType={this.props.setSearchType}
          setSearchSortBy={this.props.setSearchSortBy}
          doSearchRequest={this.props.doSearchRequest}
          searchResultsCount={this.props.searchResults.length}
        />
        <div className="search-results">
          {
            this.props.searchResults.length === 0 && this.props.searchQuery === '' ?
              <div className="search-empty-state" />
            : null
          }
          {
            this.props.searchResults.map((result) => {
              return (
                <SearchResult
                  key={`search-result-${result._id}`}
                  series={result}
                  seriesType={this.props.searchType}
                  showSeries={this.props.showSeries}
                  currentList={this.props.currentList}
                  addItem={this.props.addItem}
                  updateItem={this.props.updateItem}
                  removeItem={this.props.removeItem}
                  upsertItem={this.props.upsertItem}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  // Actions
  doSearchRequest: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setSearchSortBy: PropTypes.func.isRequired,
  setSearchType: PropTypes.func.isRequired,
  showSeries: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  upsertItem: PropTypes.func.isRequired,

  // Store
  currentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  searchSortBy: PropTypes.string.isRequired,
  searchLoading: PropTypes.bool.isRequired,
  searchResults: PropTypes.array.isRequired
};

export default Search;
