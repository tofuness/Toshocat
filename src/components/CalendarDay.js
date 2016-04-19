import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import cx from 'classnames';

import CalendarSeries from './CalendarSeries';
import CalendarFeaturedSeries from './CalendarFeaturedSeries';

class CalendarDay extends Component {
  // Add immutable structures instead?
  shouldComponentUpdate(nextProps) {
    if (this.props.day !== nextProps.day) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <div className="day">
        <div
          ref="dayInfo"
          className={cx({
            'day-info': true,
            isNow: moment(this.props.day[0].airdate).isSame(moment(), 'day')
          })}
        >
          <div className="day-date">
            {this.props.day[0] ? moment(this.props.day[0].airdate).format('DD') : null}
          </div>
          <div className="day-name">
            {this.props.day[0] ? moment(this.props.day[0].airdate).format('ddd') : null}
          </div>
        </div>
        <div className="day-series">
          {
            this.props.day.map((series) => {
              if (
                [
                  'Mayoiga',
                  'Kuma Miko: Girl Meets Bear',
                  'JoJo no Kimyou na Bouken: Diamond wa Kudakenai',
                  'Ansatsu Kyoushitsu (TV) 2nd Season',
                  'Boku no Hero Academia',
                  'Macross Δ',
                  'Re:Zero kara Hajimeru Isekai Seikatsu',
                  'Osomatsu-san'
                ].indexOf(series.anime.romaji_title) > -1
              ) {
                return (
                  <CalendarFeaturedSeries
                    series={series}
                    showSeries={this.props.showSeries}
                    key={`calendar_series_${series.id}`}
                  />
                );
              }
              return (
                <CalendarSeries
                  series={series}
                  showSeries={this.props.showSeries}
                  key={`calendar_series_${series.id}`}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

CalendarDay.propTypes = {
  // Data
  day: PropTypes.arrayOf(PropTypes.object),

  // Actions
  showSeries: PropTypes.func.isRequired
};

export default CalendarDay;
