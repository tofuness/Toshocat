import React, { Component, PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';

import DevTools from '../containers/DevTools';
import SeriesContainer from '../containers/SeriesContainer';
import ToastQueueContainer from '../containers/ToastQueueContainer';
import TitleBar from './TitleBar';
import SideBar from './SideBar';

/**
 * The fade in animation can be polished. Using this for now.
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      tooltipPosition: 'top',
      tooltipColor: 'blue'
    };
  }
  componentDidMount() {
    $(this.refs.app).on('mouseenter', '[data-tip]', (e) => {
      $(e.target).attr('data-added', true);
      this.setState({
        tooltipPosition: $(e.target).data('tip-position') || 'top',
        tooltipColor: $(e.target).data('tip-color') || 'blue'
      });
      ReactTooltip.rebuild();
    });
  }
  render() {
    return (
      <div id="app" ref="app">
        <ToastQueueContainer />
        <ReactTooltip
          multiline
          type="dark"
          effect="solid"
          class={cx({
            tooltip: true,
            black: this.state.tooltipColor === 'black'
          })}
          offset={{ top: -15 }}
        />
        <TitleBar />
        <SideBar />
        <div id="app-container">
          {this.props.children}
        </div>
        <SeriesContainer />
        {__DEV__ ? <DevTools /> : null}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
