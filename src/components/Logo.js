import React, { PropTypes, Component } from 'react';
import ReactOutsideEvent from 'react-outside-event';
import pubsub from 'pubsub-js';
import cx from 'classnames';

import SyncerFactory from '../syncers/SyncerFactory';
import toshoStore from '../utils/store';

class Logo extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };
  }
  onOutsideEvent() {
    if (this.state.visible) {
      this.setState({
        visible: false
      });
    }
  }
  toggleMenu = () => {
    this.setState({
      visible: !this.state.visible
    });
  }
  switchToHummingbird = () => {
    const hbSyncer = new SyncerFactory({
      username: toshoStore.get('hummingbird.username'),
      password: toshoStore.get('hummingbird.password')
    }, 'Hummingbird');

    pubsub.publishSync('SHOW_LOADING_MESSAGE', 'Syncing with Hummingbird...');
    hbSyncer.authenticate()
    .then(() => {
      return hbSyncer.getList('anime');
    })
    .then((animeList) => {
      toshoStore.saveList('hummingbird', animeList);
      this.props.switchList('hummingbird');
      this.props.switchSyncer(hbSyncer);
      pubsub.publishSync('HIDE_LOADING_MESSAGE');
    });
    this.setState({
      visible: false
    });
  }
  switchToMyAnimeList = () => {
    const malSyncer = new SyncerFactory({
      username: toshoStore.get('myanimelist.username'),
      password: toshoStore.get('myanimelist.password')
    }, 'MyAnimeList');

    pubsub.publishSync('SHOW_LOADING_MESSAGE', 'Syncing with MyAnimeList...');

    let completeList = [];
    malSyncer.authenticate()
    .then(() => {
      return malSyncer.getList('anime');
    })
    .then((animeList) => {
      completeList = completeList.concat(animeList);
      return malSyncer.getList('manga');
    })
    .then((mangaList) => {
      toshoStore.saveList('myanimelist', completeList.concat(mangaList));
      this.props.switchList('myanimelist');
      this.props.switchSyncer(malSyncer);
      pubsub.publishSync('HIDE_LOADING_MESSAGE');
    });
    this.setState({
      visible: false
    });
  }
  switchToToshocat = () => {
    this.props.switchSyncer(null);
    this.props.switchList('toshocat');
    this.setState({
      visible: false
    });
  }
  render() {
    return (
      <div className="logo">
        <div className="logo-image" onClick={this.toggleMenu}>
          <div
            className={cx({
              'logo-menu-arrow': true,
              'icon-chevron-small-down': true,
              active: this.state.visible
            })}
          >
          </div>
        </div>
        <div
          className={cx({
            'logo-menu': true,
            visible: this.state.visible
          })}
        >
          <div className="logo-menu-label">
            Switch service
          </div>
          <div
            className="logo-menu-option"
            onClick={this.switchToToshocat}
            data-tip="All data is stored locally.<br />No account required."
          >
            <div className="logo-menu-icon toshocat">
            </div>
            <div className="logo-menu-text">
              Toshocat
            </div>
            <span
              className={cx({
                'logo-menu-current': true,
                visible: this.props.currentListName === 'toshocat'
              })}
            >
              Current
            </span>
          </div>
          <div
            className="logo-menu-option"
            onClick={this.switchToMyAnimeList}
            data-tip="All list data is stored online. Requires an <br />account on MyAnimeList.com."
          >
            <div className="logo-menu-icon myanimelist">
            </div>
            <div className="logo-menu-text">
              MyAnimeList
            </div>
            <span
              className={cx({
                'logo-menu-current': true,
                visible: this.props.currentListName === 'myanimelist'
              })}
            >
              Current
            </span>
          </div>
          <div
            className="logo-menu-option"
            onClick={this.switchToHummingbird}
            data-tip="All list data is stored online. Requires an <br />account on Hummingbird.me."
          >
            <div className="logo-menu-icon hummingbird">
            </div>
            <div className="logo-menu-text">
              Hummingbird
            </div>
            <span
              className={cx({
                'logo-menu-current': true,
                visible: this.props.currentListName === 'hummingbird'
              })}
            >
              Current
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Logo.propTypes = {
  currentListName: PropTypes.string.isRequired,

  // Actions
  switchSyncer: PropTypes.func.isRequired,
  switchList: PropTypes.func.isRequired
};

export default new ReactOutsideEvent(Logo, ['mouseup']);
