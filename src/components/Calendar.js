import React, { Component, PropTypes } from 'react';
import CalendarDay from './CalendarDay';

import Spinner from './UI/Spinner';

class Calendar extends Component {
  componentDidMount = () => {
    if (!this.props.currentCalendar.length) {
      this.props.loadCalendar();
    }
  }
  render() {
    console.log(this.props.calendarIsLoading);
    return (
      <div className="calendar">
        <div className="days" ref="days">
          {
            this.props.currentCalendar.map((day, index) => {
              return (
                <CalendarDay
                  day={day}
                  key={`calendar-day-${index}`}
                  showSeries={this.props.showSeries}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  showSeries: PropTypes.func.isRequired,
  loadCalendar: PropTypes.func.isRequired,

  // Store
  currentCalendar: PropTypes.arrayOf(PropTypes.array),
  calendarIsLoading: PropTypes.bool.isRequired
};

export default Calendar;
