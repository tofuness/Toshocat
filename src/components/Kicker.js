import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import _ from 'lodash';

const task = remote.require('ms-task');
// /V /NH /fi "IMAGENAME eq vlc.exe" /fo CSV
import anitomy from '../utils/anitomy';
let childProcess = remote.require('child_process');

class Kicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesName: '',
      seriesEpisode: '',
      visible: false
    }
  }
  componentDidMount = () => {
    this.scrobbleInterval = setInterval(() => {
      task.list('/V /NH /fi "IMAGENAME eq vlc.exe" /fo CSV', (err, data) => {
        if (data.indexOf('INFO: No tasks are running which match the specified criteria.') > -1) {
          this.setState({
            visible: false
          });
          return false;
        }
        const instances = data.trim().split('\r\n').map((instance) => {
          return instance.substr(1, instance.length - 2).split('","')[8].replace(/ \- VLC(.*)+/g, '');
        });
        anitomy.parse(childProcess, instances[0], (parsedData) => {
          if (this.state.seriesName !== parsedData.animeTitle) {
            this.setState({
              seriesName: _.get(parsedData, 'animeTitle'),
              seriesEpisode: _.get(parsedData, 'episodeNumber'),
              visible: true
            });
            this.props.scrobble(parsedData);
          }
        });
      });
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.scrobbleInterval);
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
          { this.state.seriesName }
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
  scrobble: PropTypes.func.isRequired
};

export default Kicker;
