import React, { Component, PropTypes } from 'react';

class Chart extends Component {
  render() {
    return <div></div>;
  }
}

Chart.propTypes = {
  currentChart: PropTypes.array.isRequired,
  currentSeason: PropTypes.string
};

export default Chart;
