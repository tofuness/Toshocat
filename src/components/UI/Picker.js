import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import cx from 'classnames';
import hotkey from 'react-hotkey';

import Select from './Select';
import Counter from './Counter';
import Rating from './Rating';

class PickerContent extends Component {
  static propTypes() {
    return {
      // Visible is opnly used for hotkeys atm
      visible: PropTypes.bool,
      series: PropTypes.object.isRequired,
      onSave: PropTypes.func.isRequired,
      onRemove: PropTypes.func.isRequired,
      onClose: PropTypes.func.isRequired
    };
  }
  constructor(props) {
    super(props);
    let initialState = {
      item_status_text: 'Current',
      item_status: 'current',
      item_progress: 0,
      item_rating: 0
    };
    if (this.props.series.item) {
      initialState = _.assign(initialState, {
        item_status_text: this.props.series.item.item_status_text,
        item_status: this.props.series.item.item_status,
        item_progress: this.props.series.item.item_progress,
        item_rating: this.props.series.item.item_rating
      });
    }
    hotkey.addHandler(this.handleHotkey);
    this.state = initialState;
  }
  componentWillUnmount() {
    hotkey.removeHandler(this.handleHotkey);
  }
  handleHotkey = (e) => {
    switch (e.key) {
      case 'Escape':
        this.props.onClose();
        break;
      case 'Enter':
        this.handleSave();
        break;
      default:
        break;
    }
  }
  handleStatusChange = (status) => {
    this.handleChange({
      item_status_text: _.capitalize(status.replace('onhold', 'On Hold')),
      item_status: status
    });
  }
  handleProgressChange = (progress) => {
    this.handleChange({
      item_progress: progress
    });
  }
  handleRatingChange = (rating) => {
    this.handleChange({
      item_rating: rating
    });
  }
  handleChange = (currentNextState) => {
    const nextState = _.assign({}, this.state, currentNextState);
    const total = this.props.series.episodes_total || this.props.series.chapters || false;

    // If there isn't an episodes_total available
    if (!total) {
      return this.setState(nextState);
    }

    // If status is changed to completed
    if (this.state.item_status !== 'completed' && nextState.item_status === 'completed') {
      nextState.item_progress = total;
    } else

    // If status is changed from completed to something else
    if (this.state.item_status === 'completed' && nextState.item_status && nextState.item_status !== 'completed') {
      nextState.item_progress = 0;
    } else

    // If progress is changed to completed
    if (this.state.item_progress < total && nextState.item_progress === total) {
      nextState.item_status = 'completed';
      nextState.item_status_text = 'Completed';
    } else

    // If progress is changed below completed
    if (this.state.item_progress === total && nextState.item_progress !== total) {
      nextState.item_status = 'current';
      nextState.item_status_text = 'Current';
    }

    // Dangerous! Can loop infinitely
    this.setState(nextState);
    return false;
  }
  handleSave = () => {
    this.props.onSave(
      _.merge({},
        this.props.series,
        { item: _.merge({}, this.state, { last_updated: new Date() }) }
      )
    );
  }
  handleRemove = () => {
    this.props.onRemove(this.props.series._id);
  }
  render() {
    const statusOptions = [
      {
        text: 'Current',
        value: 'current'
      },
      {
        text: 'Completed',
        value: 'completed'
      },
      {
        text: 'Planned',
        value: 'planned'
      },
      {
        text: 'On hold',
        value: 'onhold'
      },
      {
        text: 'Dropped',
        value: 'dropped'
      }
    ];

    return (
      <div className="picker">
        <div className="picker-row">
          <div className="picker-section">
            <div className="picker-header">
              Status
            </div>
            <Select
              options={statusOptions}
              currentValue={this.state.item_status}
              currentText={this.state.item_status_text}
              handleChange={this.handleStatusChange}
            />
          </div>
          <div className="picker-section">
            <div className="picker-header">
              Progress
            </div>
            <div className="cf">
              <div className="picker-counter">
                <Counter
                  handleChange={this.handleProgressChange}
                  currentValue={this.state.item_progress}
                  max={this.props.series.episodes_total || this.props.series.chapters || 9999}
                />
              </div>
              <div className="picker-counter-sep">/</div>
              <div className="picker-counter-total">{this.props.series.episodes_total || this.props.series.chapters || '?'}</div>
            </div>
          </div>
        </div>
        <div className="picker-row">
          <div className="picker-header">
            Rating
          </div>
          <Rating
            onChange={this.handleRatingChange}
            defaultRating={this.state.item_rating}
          />
        </div>
        <div className="picker-bottom">
          <div className="picker-save" onClick={this.handleSave}>
            Save changes
          </div>
          <div
            className={cx({
              'picker-remove': true,
              hidden: !this.props.series.item
            })}
            onClick={this.handleRemove}
          >
            &times; Remove
          </div>
        </div>
      </div>
    );
  }
}

export default PickerContent;
