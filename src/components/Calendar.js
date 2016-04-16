import React, { Component, PropTypes } from 'react';
import CalendarDay from './CalendarDay';

class Calendar extends Component {
  componentDidMount = () => {
    if (!this.props.currentCalendar.length) {
      this.props.loadCalendar();
    }
  }
  render() {
    return (
      <div className="calendar">
        <div className="days" ref="days">
          {
            this.props.currentCalendar.map((day, index) => {
              return (
                <CalendarDay
                  day={day}
                  key={`calendar_day_${index}`}
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
  currentCalendar: PropTypes.arrayOf(PropTypes.array)
};

export default Calendar;
