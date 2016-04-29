import React, { Component, PropTypes } from 'react';
import ReactOutsideEvent from 'react-outside-event';
import cx from 'classnames';
import _ from 'lodash';

import Picker from './UI/Picker';

class PickerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added: false,
      visible: false,
      locked: false,
      series: null,
      position: 'middle'
    };
  }
  componentDidMount() {
    this.getSeriesInfo();
  }
  onOutsideEvent() {
    this.handleClose();
  }
  getSeriesInfo() {
    const listItem = _.find(this.props.currentList, (item) => {
      return this.props.series._id === item._id;
    });
    this.setState({
      added: !!listItem,
      series: !!listItem ? listItem : null
    });
  }
  togglePicker = (e) => {
    if (!this.state.visible) {
      this.getSeriesInfo();
      let position = 'middle';
      position = e.pageY < 250 ? 'top' : e.pageY > window.innerHeight - 110 ? 'bottom' : 'middle';
      this.setState({
        position,
        visible: !this.state.visible
      });
    } else {
      this.handleClose();
    }
  }
  handleSave = (item) => {
    if (!this.state.locked) {
      this.setState({
        locked: true
      });

      // Aye!
      /*
      if (this.state.added) {
        this.props.updateItem(item);
      } else {
        this.props.addItem(item);
      }
      */
      this.props.upsertItem(item);

      this.setState({
        visible: false,
        added: true,
        locked: false
      });
      this.animateSuccess();
    }
  }
  handleRemove = (id) => {
    this.props.removeItem(id);
    this.setState({
      visible: false,
      added: false
    });
    this.animateRemove();
  }
  handleClose = () => {
    this.setState({
      visible: false
    });
  }
  animateSuccess() {
    $(this.refs.successIcon).velocity({
      translateY: [6, 30]
    }, {
      easing: 'easeOutExpo',
      duration: 400
    });
    $(this.refs.successOvl).css('display', 'block').delay(500).fadeOut(220);
  }
  animateRemove() {
    $(this.refs.removeIcon).velocity({
      translateY: [7, 30]
    }, {
      easing: 'easeOutExpo',
      duration: 400
    });
    $(this.refs.removeOvl).css('display', 'block').delay(500).fadeOut(220);
  }
  render() {
    return (
      <div className="picker-btn" ref="pickerBtn">
        <div className="picker-animate-success" ref="successOvl">
          <div className="icon-check" ref="successIcon"></div>
        </div>
        <div className="picker-animate-remove" ref="removeOvl">
          <div ref="removeIcon">Removed</div>
        </div>
        <div
          className={cx({
            'picker-btn-text': true,
            added: this.state.added,
            active: this.state.visible
          })}
          onClick={this.togglePicker}
        >
          {!this.state.added ? '+ Add series' : 'Edit entry'}
        </div>
        <div
          className={cx({
            'picker-btn-content': true,
            added: this.state.added,
            active: this.state.visible,
            hidden: !this.state.visible,
            top: this.state.position === 'top',
            bottom: this.state.position === 'bottom'
          })}
          ref="pickerContent"
        >
        {this.state.visible ?
          <Picker
            series={this.state.series || this.props.series}
            visible={this.state.visible}
            onSave={this.handleSave}
            onRemove={this.handleRemove}
            onClose={this.handleClose}
          />
          : null}
        </div>
      </div>
    );
  }
}

PickerButton.propTypes = {
  // Actions
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  upsertItem: PropTypes.func.isRequired,

  // Store
  currentList: PropTypes.arrayOf(PropTypes.object).isRequired,
  series: PropTypes.object.isRequired
};

export default new ReactOutsideEvent(PickerButton, ['mouseup']);
