import React, { Component, PropTypes } from 'react';
import ReactList from 'react-list';
import cx from 'classnames';

import ListTabs from './ListTabs';
import ListSearch from './ListSearch';
import ListHeaders from './ListHeaders';
import ListItem from './ListItem';

/*

        <ReactList
          itemRenderer={this.renderItem}
          length={this.props.visibleList.length}
          updateThisList={this.props.visibleList}
          type="simple"
        />
 */
/*
        <div>
          {this.props.visibleList.map((listEntry) => {
            return (
              <ListItem
                key={listEntry._id}
                currentList={this.props.currentList}
                series={listEntry}
                seriesType={this.props.currentListType}

                showSeries={this.props.showSeries}
                addItem={this.props.addItem}
                removeItem={this.props.removeItem}
                updateItem={this.props.updateItem}
              />
            );
          })}
        </div>
 */

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentListType: ''
    };
  }
  gotoSearch = () => {
    this.context.router.replace('/search');
  }
  itemRenderer = (index) => {
    // IMPORTANT: We are currently using the series _id instead
    // of provided key from react-list to prevent re-renders on list length change.
    return (
      <ListItem
        listSortBy={this.props.listSortBy}
        key={this.props.visibleList[index]._id || this.props.visibleList[index].mal_id}
        currentList={this.props.currentList}
        series={this.props.visibleList[index]}
        seriesType={this.props.currentListType}
        showSeries={this.props.showSeries}
        addItem={this.props.addItem}
        removeItem={this.props.removeItem}
        updateItem={this.props.updateItem}
        upsertItem={this.props.upsertItem}
      />
    );
  }
  render() {
    return (
      <div className="list">
        <ListTabs
          filterListByStatus={this.props.filterListByStatus}
          listStatusFilter={this.props.listStatusFilter}
          listStatusCount={this.props.listStatusCount}
        />
        <ListSearch
          searchList={this.props.searchList}
          listSearchQuery={this.props.listSearchQuery}
        />
        <ListHeaders
          listSortOrder={this.props.listSortOrder}
          listSortBy={this.props.listSortBy}
          sortListBy={this.props.sortListBy}
        />
        <div
          className={cx({
            'list-reactlist': true,
            hidden: this.props.visibleListIsEmpty
          })}
        >
          <ReactList
            itemRenderer={this.itemRenderer}
            itemsRenderer={this.itemsRenderer}
            length={this.props.visibleList.length}
            updateThisList={this.props.visibleList}
            type="simple"
          />
        </div>
        <div
          className={cx({
            'list-empty': true,
            hidden: !this.props.visibleListIsEmpty
          })}
        >
          <div className="list-empty-content">
            <div className="list-empty-title">
              This list is currently empty
            </div>
            <div className="list-empty-message">
              You can add series to this list through the search section
            </div>
            <div className="list-empty-action" onClick={this.gotoSearch}>
              Go to search section
            </div>
          </div>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  // Actions
  loadList: PropTypes.func.isRequired,
  filterListByStatus: PropTypes.func.isRequired,
  sortListBy: PropTypes.func.isRequired,
  showSeries: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  upsertItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  searchList: PropTypes.func.isRequired,

  // Selectors
  listSortOrder: PropTypes.string.isRequired,
  listSortBy: PropTypes.string.isRequired,
  visibleListIsEmpty: PropTypes.bool.isRequired,
  visibleList: PropTypes.array.isRequired,
  currentList: PropTypes.array.isRequired,
  listStatusFilter: PropTypes.string.isRequired,
  listStatusCount: PropTypes.object.isRequired,
  listSearchQuery: PropTypes.string.isRequired,

  // Misc data
  currentListType: PropTypes.string,
  history: PropTypes.object
};

List.contextTypes = {
  router: PropTypes.object.isRequired
};

export default List;
