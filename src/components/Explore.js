import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import _ from 'lodash';

class Explore extends Component {
  componentDidMount = () => {
    if (_.isEmpty(this.props.collections)) {
      this.props.loadCollections();
    }
  }
  render() {
    return (
      <div className="explore">
        <div className="explore-top">
          <Link to="/explore/collections" activeClassName="active">Collections</Link>
          <Link to="/explore/featured" activeClassName="active">Featured</Link>
        </div>
        {
          React.cloneElement(
            this.props.children || <div />,
            { collections: this.props.collections }
          )
        }
      </div>
    );
  }
}

Explore.propTypes = {
  children: PropTypes.node,
  loadFeatured: PropTypes.func.isRequired,
  loadCollections: PropTypes.func.isRequired,

  collections: PropTypes.array.isRequired
};

export default Explore;
