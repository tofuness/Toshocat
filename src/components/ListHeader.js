import React, { Component, PropTypes } from 'react';

import cx from 'classnames';

class ListHeader extends Component {
  sortListBy = () => {
    this.props.sortListBy(this.props.header.property);
  }
  render() {
    return (
      <div
        data-id={this.props.header.name}
        key={`list-header-${this.props.header.name}`}
        className={cx({
          'list-header': true,
          'list-header--title': this.props.header.name === 'Title',
          active: this.props.listSortBy === this.props.header.property
        })}
        onClick={this.sortListBy}
      >
        <div className="list-header-title">
          {this.props.header.name}
        </div>
        <div
          className={cx({
            'list-header-icon': true,
            'icon-chevron-small-down': true,
            asc: this.props.listSortOrder === 'asc',
            hidden: this.props.listSortBy !== this.props.header.property
          })}
        ></div>
      </div>
    );
  }
}

ListHeader.propTypes = {
  // Actions
  sortListBy: PropTypes.func.isRequired,

  // Store
  header: PropTypes.object.isRequired,
  listSortBy: PropTypes.string.isRequired,
  listSortOrder: PropTypes.string.isRequired
};

export default ListHeader;
