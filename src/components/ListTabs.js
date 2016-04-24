import React, { Component, PropTypes } from 'react';
import hotkey from 'react-hotkey';
import cx from 'classnames';
import utils from '../utils';

class ListTabs extends Component {
  constructor(props) {
    super(props);
    hotkey.addHandler(this.handleHotkey);
  }
  componentWillUnmount() {
    hotkey.removeHandler(this.handleHotkey);
  }
  onClick = (status) => {
    this.props.filterListByStatus(status);
  }
  handleHotkey = (e) => {
    const statuses = ['current', 'completed', 'planned', 'onhold', 'dropped'];
    if (e.ctrlKey && e.key === 'Tab') {
      this.props.filterListByStatus(
        statuses[
          utils.mod(statuses.indexOf(this.props.listStatusFilter) + (e.shiftKey ? -1 : 1), 5)
        ]
      );
    }
  }
  render() {
    return (
      <div className="list-tabs">
        {
          ['Current', 'Completed', 'Planned', 'On hold', 'Dropped'].map((statusStr) => {
            const status = statusStr.toLowerCase().replace(' ', '');
            return (
              <div
                className={cx({
                  'list-tab': true,
                  active: this.props.listStatusFilter === status
                })}
                onMouseDown={this.onClick.bind(null, status)}
                key={`list-tab-${status}`}
              >
                  {statusStr}
                <div className="list-tab-count">
                  {this.props.listStatusCount[status] || '0'}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

ListTabs.propTypes = {
  // Actions
  filterListByStatus: PropTypes.func.isRequired,

  // Selectors
  listStatusFilter: PropTypes.string.isRequired,
  listStatusCount: PropTypes.object.isRequired
};

export default ListTabs;
