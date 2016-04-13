import React, { Component, PropTypes } from 'react';

class RSSFeed extends Component {
  componentDidMount = () => {
    this.props.switchRSS('http://www.nyaa.se/?page=rss&cats=1_37&filter=2');
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
