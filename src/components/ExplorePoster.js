import React, { Component, PropTypes } from 'react';

class ExplorePoster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  handleMouseEnter = () => {
    this.setState({
      active: true
    });
  }
  handleMouseLeave = () => {
    this.setState({
      active: false
    });
  }
  render() {
    return (
      <div className="poster" style={{ backgroundImage: `url(${this.props.series.image_url})` }}>
        <div
          className="poster-ovl"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className="poster-content">
            <div className="poster-beat">
              {this.props.series.type}
            </div>
            <div className="poster-title">
              {this.props.series.title}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ExplorePoster.propTypes = {
  series: PropTypes.object.isRequired
};

export default ExplorePoster;
