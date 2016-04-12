import React from 'react';
import cx from 'classnames';

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
      <div className="ui-rating" onMouseLeave={this.handleMouseLeave}>
        <div className="ui-rating-zero"
          onMouseMove={this.showRating.bind(this, 0)}
          onMouseDown={this.setRating.bind(this, 0)}>
        </div>
        { ratingIcons }
        <div
          className={cx({
            hidden: !this.props.showLabel,
            'ui-rating-label': true
          })}
        >
          {this.state.rating.toFixed(1)}
        </div>
      </div>
    );
  }
});

export default Rating;
