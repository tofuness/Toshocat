import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import cx from 'classnames';
import _ from 'lodash';

class CalendarSeries extends Component {
  onClick = () => {
    this.props.showSeries(this.props.series.anime.mal_url.replace('http://myanimelist.net/anime/', ''));
  }
  render() {
    if (!this.props.series) return null;
    return (
      <div className="calendar-series">
        <div className="calendar-series-title" onClick={this.onClick}>
          {this.props.series.anime.romaji_title}
        </div>
        <div className="calendar-series-meta">
          <span
            className={cx({
              'calendar-series-airtime': true,
              isNow: moment(this.props.series.airdate)
                      .isBetween(
                        moment().subtract(1, 'hours'),
                        moment().add(1, 'hours')
                      )
            })}
          >
            {moment(this.props.series.airdate).format('hh:mm A')}
          </span>
          {` | Episode ${this.props.series.number || 1}`}
          {` (${_.upperCase(this.props.series.anime.anime_type)})`}
        </div>
      </div>
    );
  }
}

CalendarSeries.propTypes = {
  // Data
  series: PropTypes.object.isRequired,

  // Actions
  showSeries: PropTypes.func.isRequired
};

export default CalendarSeries;
