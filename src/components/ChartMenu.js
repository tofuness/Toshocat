import React, { Component, PropTypes } from 'react';
import cartesianProduct from 'cartesian-product';

class ChartMenu extends Component {
  constructor(props) {
    super(props);
    const seasons = ['spring', 'summer', 'fall', 'winter'];
    this.state = {
      seasons: cartesianProduct([
        seasons, ['2012', '2013', '2014', '2015', '2016']
      ])
      .map((product) => {
        return {
          text: `${product[0]} ${product[1]}`,
          value: `${product[0]}-${product[1]}`,
          season: product[0],
          year: product[1]
        };
      })
      .sort((a, b) => {
        return (b.year + seasons.indexOf(b.season))
          .localeCompare(a.year + seasons.indexOf(a.season));
      })
    };
  }
  render() {
    return (
      <div className="chart-menu">
        {
          this.state.seasons.map((season) => {
            return <div className="chart-menu-item">{season.text}</div>;
          })
        }
      </div>
    );
  }
}

ChartMenu.propTypes = {
  // Actions
  loadChart: PropTypes.func.isRequired,
  switchSeason: PropTypes.func.isRequired,

  // Props
  currentChart: PropTypes.array.isRequired,
  currentSeason: PropTypes.string
};

export default ChartMenu;
