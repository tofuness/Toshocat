import React, { Component, PropTypes } from 'react';
import Collapse from 'react-collapse';
import hotkey from 'react-hotkey';
import cx from 'classnames';

class ListSearch extends Component {
  constructor(props) {
    super(props);
    hotkey.addHandler(this.handleHotkey);
    this.state = {
      visible: false
    };
  }
  componentWillUnmount() {
    hotkey.removeHandler(this.handleHotkey);
  }
  handleHotkey = (e) => {
    if (e.ctrlKey && e.keyCode === 70) {
      $(this.refs.listSearchInput).focus();
      this.setState({
        visible: true
      });
    } else if (e.key === 'Escape') {
      this.setState({
        visible: false
      });
      setTimeout(() => {
        this.props.searchList('');
      }, 200);
    }
  }
  handleChange = (e) => {
    this.props.searchList(e.target.value);
  }
  render() {
    return (
      <Collapse
        isOpened={this.state.visible}
        springConfig={{ stiffness: 420, damping: 30 }}
      >
        <div className="list-search">
          <input
            autoFocus
            ref="listSearchInput"
            type="text"
            className={cx({
              'list-search-input': true,
              visible: this.state.visible
            })}
            value={this.props.listSearchQuery}
            onChange={this.handleChange}
            placeholder={'Search all entries in list...'}
          />
        </div>
      </Collapse>
    );
  }
}

ListSearch.propTypes = {
  searchList: PropTypes.func.isRequired,
  listSearchQuery: PropTypes.string.isRequired
};

export default ListSearch;
