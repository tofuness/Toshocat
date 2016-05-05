import React, { Component, PropTypes } from 'react';
import ChartMenu from './ChartMenu';

class Chart extends Component {
  componentDidMount = () => {
    this.props.switchSeason('spring-2016');
    this.props.loadChart();
  }
  render() {
    return (
      <div className="chart">
        <ChartMenu {...this.props} />
        <div className="chart-items">
          {
            this.props.currentChart
            .filter((item) => {
              return item.anime.anime_type === 1;
            })
            .map((item) => {
              return (
                <div
                  key={`chart-item-${item.id}`}
                  className="chart-item"
                  style={{
                    backgroundImage: `url(${item.anime.poster_image})`
                  }}
                >
                  <div className="chart-item-scrim">
                    <div className="chart-item-title">
                      {item.anime.romaji_title}
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  // Actions
  loadChart: PropTypes.func.isRequired,
  switchSeason: PropTypes.func.isRequired,

  // Props
  currentChart: PropTypes.array.isRequired,
  currentSeason: PropTypes.string
};

export default Chart;
