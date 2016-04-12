import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

// Buggy as hell.
class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionX: 0,
      maxPositionX: 0
    };
  }
  componentDidMount() {
    $(window).on('resize', () => {
      this.setMaxPositionX();
    });
  }
  componentWillUnmount() {
    $(window).off('resize');
  }
  setMaxPositionX = () => {
    let totalWidth = 0;
    $(this.refs.carousel).find('.poster').each(function eachPoster() {
      totalWidth += $(this).outerWidth(true);
    });
    totalWidth -= 10;
    this.setState({
      maxPositionX: Math.max(totalWidth - $(this.refs.carousel).outerWidth(), 0)
    });
  }
  handleWheel = (e) => {
    e.preventDefault();
    this.setState({
      positionX: e.deltaY > 0 ?
        Math.max(this.state.positionX - 100, -this.state.maxPositionX)
        : Math.min(this.state.positionX + 100, 0)
    });
  }
  render() {
    return (
      <div className="carousel" onWheel={this.handleWheel} onMouseEnter={this.setMaxPositionX} ref="carousel">
        <div className="carousel-top">
          <div className="carousel-header">
            <div className="carousel-title">
              {this.props.title}
            </div>
            <div className="carousel-byline">
              {this.props.byline}
            </div>
          </div>
        </div>
        <Motion
          defaultStyle={{ x: 0 }}
          style={{ x: spring(this.state.positionX, { stiffness: 300, damping: 26 }) }}
        >
          {
            styles => {
              return (
                <div
                  className="carousel-content"
                  style={{ transform: `translateX(${styles.x}px)` }}
                >
                  {this.props.children}
                </div>
              );
            }
          }
        </Motion>
      </div>
    );
  }
}

Carousel.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  byline: PropTypes.string,
  offsetFirst: PropTypes.number,
  elementWidth: PropTypes.number.isRequired
};

export default Carousel;
