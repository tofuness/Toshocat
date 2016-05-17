import React, { PropTypes } from 'react';
import ReactOutsideEvent from 'react-outside-event';
import cx from 'classnames';

const Select = React.createClass({
  propTypes() {
    return {
      handleChange: PropTypes.func
    };
  },
  getDefaultProps() {
    return {
      placeholder: 'Select...',
      options: []
    };
  },
  getInitialState() {
    return {
      visible: false,
      value: null,
      currentText: null
    };
  },
  componentDidMount() {
    this.handleControlProps(this.props);
  },
  componentWillReceiveProps(nextProps) {
    this.handleControlProps(nextProps);
  },
  onOutsideEvent() {
    if (this.state.visible) {
      this.setState({
        visible: false
      });
    }
  },
  handleControlProps(nextProps) {
    // If the component is "controlled", we replace with new props
    if (nextProps.currentText) {
      this.setState({
        currentText: nextProps.currentText
      });
    }
    if (nextProps.currentValue) {
      this.setState({
        currentValue: nextProps.currentValue
      });
    }
  },
  handleSelect(e) {
    this.setState({
      currentText: e.currentTarget.textContent,
      currentValue: e.currentTarget.getAttribute('data-status'),
      visible: false
    });
    this.props.handleChange(e.currentTarget.getAttribute('data-status'));
  },
  toggleVisible() {
    const currentWidth = $(this.refs.selectCurrent).outerWidth();
    const $options = $(this.refs.selectOptions);
    $options.css({
      left: -$options.outerWidth() / 2 + currentWidth / 2
    });
    this.setState({
      visible: !this.state.visible
    });
  },
  render() {
    return (
      <div className="ui-select">
        <div
          onClick={this.toggleVisible}
          ref="selectCurrent"
          className={cx({
            'ui-select-current': true,
            active: this.state.visible
          })}
        >
          {this.state.currentText ? this.state.currentText : this.props.placeholder}
          <div
            className={cx({
              'icon-chevron-thin-down': true,
              'ui-select-arrow': true,
              active: this.state.visible
            })}
          ></div>
        </div>
        <div
          ref="selectOptions"
          className={cx({
            'ui-select-options': true,
            active: true,
            hidden: !this.state.visible
          })}
        >
          {
            this.props.options.map((option, index) => {
              return (
                <div
                  key={`select-option-${index}`}
                  className="ui-select-option"
                  onClick={this.handleSelect}
                  data-status={option.value}
                >{option.text}</div>
              );
            })
          }
        </div>
      </div>
    );
  }
});

export default new ReactOutsideEvent(Select, ['mouseup']);
