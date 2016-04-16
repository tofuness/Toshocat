import React, { Component, PropTypes } from 'react';

class RSSFeed extends Component {
  componentDidMount = () => {
    this.props.switchRSS('http://tokyotosho.info/rss.php?filter=1,11&zwnj=0');
    this.props.loadRSS();
  }
  render() {
    return (
      <div className="feed">
        {
          this.props.RSS.map((item) => {
            return <div className="feed-item">{item.title}</div>;
          })
        }
      </div>
    );
  }
}

RSSFeed.propTypes = {
  RSS: PropTypes.arrayOf(PropTypes.object),
  RSSUrl: PropTypes.string,

  loadRSS: PropTypes.func.isRequired,
  switchRSS: PropTypes.func.isRequired
};

export default RSSFeed;
