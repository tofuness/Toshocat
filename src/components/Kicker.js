import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class Kicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesTitle: '',
      seriesEpisode: '',
      visible: false
    };
  }
  componentDidMount = () => {
    ipcRenderer.on('media-detected', (event, data) => {
      if (data[0].animeTitle !== this.state.seriesTitle) {
        this.setState({
          seriesTitle: data[0].animeTitle,
          seriesEpisode: parseInt(data[0].episodeNumber, 10) || 1,
          visible: true
        });
        this.props.requestScrobble(data[0]);
      }
    });

    ipcRenderer.on('media-lost', () => {
      this.setState({
        visible: false
      });
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
        <div className="kicker-topic">
          { this.state.seriesTitle }
        </div>
        <div className="kicker-pipe">|</div>
        <div className="kicker-description">
          { `Currently Viewing Episode ${this.state.seriesEpisode}` }
        </div>
      </div>
    );
  }
}

Kicker.propTypes = {
  latestScrobble: PropTypes.object.isRequired,

  // Actions
  requestScrobble: PropTypes.func.isRequired
};

export default Kicker;
