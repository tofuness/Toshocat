import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import Select from './UI/Select';

const sortByOptions = [
  {
    text: 'Popularity',
    value: 'popularity'
  },
  {
    text: 'Relevance',
    value: 'relevance'
  },
  {
    text: 'Recent',
    value: 'recent'
  }
];
const typeOptions = [
  {
    text: 'Anime',
    value: 'anime'
  },
  {
    text: 'Manga',
    value: 'manga'
  }
];

class SearchSettings extends Component {
  handleTypeChange = (searchType) => {
    this.props.setSearchType(searchType);
    this.props.doSearchRequest();
  }
  handleSortChange = (searchSortBy) => {
    this.props.setSearchSortBy(searchSortBy);
    this.props.doSearchRequest();
  }
  render() {
    return (
      <div className="search-settings">
        <div className="search-settings-left">
          Search for{' '}
          <Select
            options={typeOptions}
            currentText={_.capitalize(this.props.searchType)}
            handleChange={this.handleTypeChange}
          />
          {' '}sorted by{' '}
          <Select
            options={sortByOptions}
            currentText={_.capitalize(this.props.searchSortBy)}
            handleChange={this.handleSortChange}
          />
        </div>
        <div className="series-results-count">
          {this.props.searchResultsCount ? `${this.props.searchResultsCount} results found` : ''}
        </div>
      </div>
    );
  }
}

SearchSettings.propTypes = {
  searchType: PropTypes.string.isRequired,
  searchSortBy: PropTypes.string.isRequired,
  searchResultsCount: PropTypes.number.isRequired,

  setSearchType: PropTypes.func.isRequired,
  setSearchSortBy: PropTypes.func.isRequired,
  doSearchRequest: PropTypes.func.isRequired
};

export default SearchSettings;
