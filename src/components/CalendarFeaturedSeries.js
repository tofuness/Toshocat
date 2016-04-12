import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import cx from 'classnames';
import _ from 'lodash';

class CalendarFeaturedSeries extends Component {
  onClick = () => {
    this.props.showSeries(this.props.series.anime.mal_url.replace('http://myanimelist.net/anime/', ''));
  }
  render() {
    const cardStyle = {
      backgroundImage: `url(${this.props.series.anime.poster_image})`
    };
    return (
      <div className="calendar-featured">
        <div className="calendar-featured-left">
          <div
            className={cx({
              'calendar-series-airtime': true,
              isNow: moment(this.props.series.airdate)
                      .isBetween(
                        moment().subtract(2, 'hours'),
                        moment().add(2, 'hours')
                      )
            })}
          >
            {moment(this.props.series.airdate).format('hA')}
          </div>
        </div>
        <div className="calendar-featured-card" style={cardStyle}>
          <div className="calendar-featured-info">
            <div className="calendar-featured-title" onClick={this.onClick}>
              {this.props.series.anime.romaji_title}
            </div>
            <div className="calendar-featured-episode">
              {
                `Episode ${this.props.series.number || 1} —
                ${_.upperCase(this.props.series.anime.anime_type)}`
              }
            </div>
          </div>
          <div className="calendar-featured-scrim" />
        </div>
      </div>
    );
  }
}

CalendarFeaturedSeries.propTypes = {
  // Data
  series: PropTypes.object.isRequired,

  // Actions
  showSeries: PropTypes.func.isRequired
};

export default CalendarFeaturedSeries;
