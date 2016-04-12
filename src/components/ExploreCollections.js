import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import ExplorePoster from './ExplorePoster';
import Carousel from './UI/Carousel';

class ExploreCollections extends Component {
  render() {
    return (
      <div className="explore-collections">
        {
          this.props.collections.map((collection) => {
            return (
              <div className="explore-carousel">
                <Carousel
                  elementWidth={170}
                  title={collection.title}
                  byline={`Last updated ${moment(new Date(collection.last_updated)).format('MMMM D, YYYY')}`}
                >
                  {
                    collection.series.map((series) => {
                      return <ExplorePoster series={series} />;
                    })
                  }
                </Carousel>
              </div>
            );
          })
        }
      </div>
    );
  }
}

ExploreCollections.propTypes = {
  collections: PropTypes.array.isRequired
};

export default ExploreCollections;
