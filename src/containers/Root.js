import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { hashHistory, Router, Redirect, Route } from 'react-router';
import hotkey from 'react-hotkey';
hotkey.activate('keydown');

import App from '../components/App';
import ListContainer from './ListContainer';
import SearchContainer from './SearchContainer';
import ExploreContainer from './ExploreContainer';
import CalendarContainer from './CalendarContainer';
import SettingsContainer from './SettingsContainer';
import ExploreCollections from '../components/ExploreCollections';
import RSSFeedContainer from './RSSFeedContainer';
import ChartContainer from './ChartContainer';
import OnboardContainer from './OnboardContainer';

class Root extends Component {
  componentDidMount() {
    setTimeout(() => {
      $('body').addClass('visible');
    }, 1000);
  }
  render() {
    const store = this.props.store;
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Redirect from="/" to="/animelist" />
          <Route path="/" component={App}>
            <Route path="/animelist" component={ListContainer} />
            <Route path="/mangalist" component={ListContainer} />
            <Route path="/search" component={SearchContainer} />
            <Route path="/calendar" component={CalendarContainer} />
            <Route path="/chart" component={ChartContainer} />
            <Route path="/onboard" component={OnboardContainer} />
            <Route path="/explore" component={ExploreContainer}>
              <Route path="collections" component={ExploreCollections} />
            </Route>
            <Route path="/rss" component={RSSFeedContainer} />
            <Route path="/settings" component={SettingsContainer} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object
};

export default Root;
