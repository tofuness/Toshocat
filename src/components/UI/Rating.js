import React from 'react';
import cx from 'classnames';
import { Motion, spring } from 'react-motion';

const Rating = React.createClass({
  getDefaultProps() {
    return {
      max: 5, // Inclusive
      scaling: 2,
      defaultRating: 0,
      showLabel: true,
      onChange: () => {}
    };
  },
  getInitialState() {
    return {
      rating: 0,
      ratingOver: null
    };
  },
  componentDidMount() {
    if (this.props.defaultRating) {
      this.setState({
        rating: this.props.defaultRating / this.props.scaling
      });
    }
  },
  setRating(rating) {
    this.setState({
      rating
    });
    this.props.onChange(rating * this.props.scaling);
  },
  showRating(rating) {
    this.setState({
      ratingOver: rating
    });
  },
  handleMouseDown() {
    this.setRating(this.state.ratingOver);
  },
  handleMouseMove(index, event) {
    this.setState({
      ratingOver: index + this._fractionalIndex(event)
    });
  },
  handleMouseLeave() {
    this.setState({
      ratingOver: null
    });
  },
  // Functions below are taken (and modified) from
  // https://github.com/dreyescat/react-rating/
  _roundToFraction: (index) => {
    const fraction = Math.ceil(index % 1 * 2) / 2;
    return Math.floor(index) + Math.floor(fraction * 1000) / 1000;
  },
  _fractionalIndex(event) {
    const x = Math.abs(event.clientX - event.currentTarget.getBoundingClientRect().left);
    return this._roundToFraction(x / event.currentTarget.offsetWidth);
  },
  render() {
    const ratingIcons = [];
    let ratingOverLabel = this.state.ratingOver === null
      ? this.state.ratingOver
      : this.state.ratingOver.toFixed(1);
    const ratingLabel = this.state.rating.toFixed(1);
    for (let i = 0; i < this.props.max; i++) {
      let hovering = false;
      let half = false;
      let skip = false;
      const rating = this.state.ratingOver !== null ? this.state.ratingOver : this.state.rating;

      if (Math.ceil(rating) - 1 === i) {
        hovering = true;
      }
      if (rating % 1 !== 0) {
        half = true;
      }
      if (Math.ceil(rating) - 1 > i) {
        skip = true;
      }
      ratingIcons.push(
        <div
          className={cx({
            'ui-rating-icon': true,
            'icon-heart-empty': !hovering,
            'icon-heart-full': hovering && !half || skip,
            'icon-heart-half': hovering && half
          })}
          onMouseMove={this.handleMouseMove.bind(this, i)}
          onMouseDown={this.handleMouseDown.bind(this, i)} key={`heart-${i}`}>
				</div>
      );
    }

    return (
      <div className="ui-rating"
        onMouseLeave={this.handleMouseLeave}
        onMouseOver={this.handleMouseOver}>
        <div className="ui-rating-zero"
          onMouseMove={this.showRating.bind(this, 0)}
          onMouseDown={this.setRating.bind(this, 0)}>
        </div>
        { ratingIcons }
        <Motion style={{
          y: spring(this.state.ratingOver ? 9 : 0),
          alpha: spring(this.state.ratingOver ? 1 : 0.2),
        }}>
          {({y, alpha}) =>
            <div className="ui-rating-container">
              <div
                className={cx({
                  hidden: !this.props.showLabel,
                  'ui-rating-label': true
                })}
                style={{
                  WebkitTransform: `translateY(-${y}px)`,
                  transform: `translateY(-${y}px)`,
                }}
              >
                {ratingLabel}
              </div>
              <div
                className="ui-rating-over-label"
                style={{
                  WebkitTransform: `translateY(${y}px)`,
                  transform: `translateY(${y}px)`,
                  opacity: `${alpha}`
                }}
              >
                {ratingOverLabel}
              </div>
            </div>
          }
        </Motion>
      </div>
    );
  }
});

export default Rating;
