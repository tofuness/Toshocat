import React, { Component, PropTypes } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import Collapse from 'react-collapse';
import moment from 'moment';
import _ from 'lodash';

import PickerButton from './PickerButton';

// Basically how this works:
// When user hovers ListItem, the Collapse component mounts.
// When user then expands, the rest of the component mounts. Increases perf.
class ListItemExpansion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
    // Debounce action or else we get laggy re-renders
    this.saveNotesChange = _.debounce(this.saveNotesChange, 300);
  }
  handleNotesChange = (e) => {
    this.setState({
      value: e.target.value
    });
    e.persist();
    this.saveNotesChange(e);
  }
  saveNotesChange = (e) => {
    /*
    1. Update state on key press
    2. Eventually save the changes to localStorage
    3. Clear state and rely on redux store value
    4. Repeat
     */
    this.props.updateItem(
      _.merge({}, this.props.series, { item: { item_notes: e.target.value } })
    );
    this.setState({
      value: null
    });
  }
  render() {
    return (
      <Collapse
        isOpened={this.props.expanded}
        springConfig={{ stiffness: 420, damping: 30 }}
      >
        <div className="expansion">
          <div className="expansion-left">
            <div className="expansion-notes">
              <div className="textarea-label">
                Personal notes
              </div>
              <div className="textarea">
                <TextareaAutosize
                  className="textarea-field"
                  placeholder={'Write some notes...'}
                  onChange={this.handleNotesChange}
                  value={
                    this.state.value !== null ?
                      this.state.value
                      : this.props.series.item.item_notes
                  }
                  rows={3}
                  autoFocus
                />
              </div>
            </div>
          </div>
          <div className="expansion-right">
            <div className="expansion-button">
              <PickerButton
                {...this.props}
              />
            </div>
            <div
              className="expansion-lastupdated"
              data-tip={
                this.props.series.item.last_updated ?
                moment(this.props.series.item.last_updated).format('hh:mm A - MMMM D YYYY') : null
              }
            >
            Last update: {
                this.props.series.item.last_updated ?
                moment(this.props.series.item.last_updated).fromNow() : 'Unknown'
              }
            </div>
          </div>
        </div>
      </Collapse>
    );
  }
}

ListItemExpansion.propTypes = {
  currentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  series: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,

  // Actions
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  upsertItem: PropTypes.func.isRequired
};

export default ListItemExpansion;
