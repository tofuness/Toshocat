import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import PickerButton from './PickerButton';
import utils from '../utils';

class SearchResult extends Component {
  handleShowSeries = () => {
    this.props.showSeries(this.props.series.mal_id, this.props.seriesType, this.props.series);
  }
  render() {
    return (
      <div className="search-result">
        <div className="search-result-left">
          <div className="search-result-meta">
            {`${_.upperCase(this.props.series.type)} with
            ${this.props.series.episodes_total || this.props.series.chapters || '?'}
            ${utils.isAnime(this.props.series.type) ? 'Episodes' : 'Chapters'}`}
          </div>
          <div
            className="search-result-title"
            onClick={this.handleShowSeries}
          >
            {this.props.series.title}
          </div>
        </div>
        <div className="search-result-right">
          <PickerButton
            series={this.props.series}
            currentList={this.props.currentList}
            addItem={this.props.addItem}
            updateItem={this.props.updateItem}
            removeItem={this.props.removeItem}
            upsertItem={this.props.upsertItem}
          />
        </div>
      </div>
    );
  }
}

SearchResult.propTypes = {
  // Actions
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  showSeries: PropTypes.func.isRequired,
  upsertItem: PropTypes.func.isRequired,

  // Data
  currentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  series: PropTypes.object.isRequired,
  seriesType: PropTypes.string.isRequired
};

export default SearchResult;
