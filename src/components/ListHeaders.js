import React, { Component, PropTypes } from 'react';

import ListHeaderContainer from '../containers/ListHeaderContainer';
import Sortable from 'react-sortablejs';

class ListHeaders extends Component {
  onChange = (order) => {
    this.props.updateHeaderOrder(order);
  }
  render() {
    return (
      <div className="list-headers">
        <Sortable
          options={{
            animation: 100
          }}
          className="list-headers-sortable"
          onChange={this.onChange}
        >
          {
            this.props.headerOrder.map((header) => {
              return (
                <ListHeaderContainer
                  key={header.name}
                  header={header}
                />
              );
            })
          }
        </Sortable>
      </div>
    );
  }
}

ListHeaders.propTypes = {
  updateHeaderOrder: PropTypes.func.isRequired,
  sortListBy: PropTypes.func.isRequired,

  listSortBy: PropTypes.string.isRequired,
  listSortOrder: PropTypes.string.isRequired,
  headerOrder: PropTypes.array.isRequired
};

export default ListHeaders;
