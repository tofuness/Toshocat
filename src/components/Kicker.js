import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import _ from 'lodash';

import settings from '../utils/settings';

class Kicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  componentDidMount = () => {
    switch (settings.get('listName')) {
      case 'toshocat':
        this.props.switchToToshocat();
        break;
      case 'hummingbird':
        this.props.switchToHummingbird();
        break;
      case 'myanimelist':
        this.props.switchToMyAnimeList();
        break;
      default:
        break;
    }
    ipcRenderer.removeAllListeners('media-detected');
    ipcRenderer.removeAllListeners('media-lost');
    ipcRenderer.on('media-detected', (event, detectedMedia) => {
      if (
        detectedMedia.episode_number &&
        detectedMedia.file_name !== this.props.currentScrobble.file_name
      ) {
        this.props.requestScrobble(detectedMedia);
        this.setState({
          visible: true
        });
      }
    });

    ipcRenderer.on('media-lost', () => {
      if (!_.isEmpty(this.props.currentScrobble)) {
        this.setState({
          visible: false
        });
        this.props.clearScrobble();
      }
    });

    ipcRenderer.on('scrobble-confirm', (event, data) => {
      this.props.confirmScrobble(data);
    });
  }
  componentWillUnmount() {
    ipcRenderer.removeAllListeners('media-detected');
    ipcRenderer.removeAllListeners('media-lost');
  }
  render() {
    return (
      <div
        className={
          cx({
            kicker: true,
            visible: this.state.visible
          })
        }
      >
        <div className="kicker-description">
          {`Now playing · Episode ${parseFloat(this.props.currentScrobble.episode_number) || '1'}`}
        </div>
        <div className="kicker-pipe"></div>
        <div className="kicker-topic">
          {_.get(this.props.currentScrobble, 'series.title')}
        </div>
      </div>
    );
  }
}

Kicker.propTypes = {
  currentScrobble: PropTypes.object.isRequired,

  // Actions
  confirmScrobble: PropTypes.func.isRequired,
  requestScrobble: PropTypes.func.isRequired,
  clearScrobble: PropTypes.func.isRequired,
  switchToToshocat: PropTypes.func.isRequired,
  switchToHummingbird: PropTypes.func.isRequired,
  switchToMyAnimeList: PropTypes.func.isRequired
};

export default Kicker;
