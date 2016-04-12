import React, { Component, PropTypes } from 'react';

class CalendarNav extends Component {
  render() {
    return <div />;
  }
}

CalendarNav.propTypes = {
  days: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CalendarNav;
