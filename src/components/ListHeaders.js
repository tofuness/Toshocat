import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class ListHeaders extends Component {
  render() {
    return (
      <div className="list-headers">
        {
          [{
            name: 'Title',
            property: 'title'
          }, {
            name: 'Progress',
            property: 'item.item_progress'
          }, {
            name: 'Rating',
            property: 'item.item_rating'
          }, {
            name: 'Type',
            property: 'type'
          }].map((header) => {
            return (
              <div
                key={`list-header-${header.name}`}
                className={cx({
                  'list-header': true,
                  active: this.props.listSortBy === header.property
                })}
                onClick={this.props.sortListBy.bind(null, header.property)}
              >
                <div className="list-header-title">
                  {header.name}
                </div>
                <div
                  className={cx({
                    'list-header-icon': true,
                    'icon-chevron-small-down': true,
                    asc: this.props.listSortOrder === 'asc',
                    hidden: this.props.listSortBy !== header.property
                  })}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}

ListHeaders.propTypes = {
  listSortBy: PropTypes.string.isRequired,
  listSortOrder: PropTypes.string.isRequired,
  sortListBy: PropTypes.func.isRequired
};

export default ListHeaders;
