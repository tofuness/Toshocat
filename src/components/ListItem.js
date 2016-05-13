import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import ListItemExpansion from './ListItemExpansion';

import _ from 'lodash';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      expansionMounted: false,
      visible: true
    };
    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.handleMountExpansion = this.handleMountExpansion.bind(this);
  }
  componentWillReceiveProps = (newProps) => {
    if (this.props.series._id !== newProps.series._id && this.state.expanded) {
      this.setState({
        expanded: false,
        expansionMounted: false
      });
    }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.series !== this.props.series || this.state !== nextState) {
      return true;
    }
    return false;
  }
  toggleExpansion(e) {
    if (e.target.className !== 'list-item-link') {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }
  handleMountExpansion(shouldMount) {
    if (!this.state.expanded) {
      this.setState({
        expansionMounted: shouldMount
      });
    }
  }
  handleShowSeries = () => {
    this.props.showSeries(this.props.series.mal_id, this.props.seriesType, this.props.series);
  }
  handleRemoveItem = (item) => {
    this.setState({
      expanded: false
    });
    $(this.refs.listItem)
    .css('overflow', 'hidden')
    .velocity({
      color: '#fff',
      backgroundColor: '#d73636',
      height: 0
    }, {
      easing: 'easeInOutQuint',
      duration: 500,
      complete: () => {
        this.props.removeItem(item);
      }
    });
  }
  handleUpdateItem = (item) => {
    if (
      _.get(item, this.props.listSortBy) === _.get(this.props.series, this.props.listSortBy) &&
      _.get(item, 'item.item_status') === _.get(this.props.series, 'item.item_status')
    ) {
      this.props.updateItem(item);
    } else {
      /*
      I currently can't think of a better method for making sure
      the animation only occurs when list item index is changed or if
      status is changed. We want to avoid animating all the elements on tab
      change etc.
       */
      this.setState({
        expanded: false
      });
      $(this.refs.listItem)
      .css('overflow', 'hidden')
      .velocity({
        color: '#fff',
        backgroundColor: '#65ce37',
        height: 0
      }, {
        easing: 'easeInOutQuint',
        duration: 500,
        complete: () => {
          this.props.upsertItem(item);
          $(this.refs.listItem).velocity({
            opacity: 1,
            height: 37,
            color: '#202326',
            backgroundColor: '#fff'
          }, {
            duration: 300,
            easing: 'easeOutQuint',
            complete: () => {
              $(this.refs.listItem).css({
                overflow: 'visible',
                height: '100%'
              });
            }
          });
        }
      });
    }
  }
  render() {
    return (
      <div
        ref="listItem"
        className={cx({
          'list-item': true,
          expanded: this.state.expanded
        })}
        onMouseDown={this.handleMountExpansion.bind(null, true)}
      >
        <div className="list-item-content" onClick={this.toggleExpansion}>
          <div className="list-item-title">
            <div
              className="list-item-link"
              onClick={this.handleShowSeries}
            >
              {this.props.series.title}
            </div>
            <span
              className={cx({
                'list-item-hasnotes': true,
                visible: !!_.get(this.props.series, 'item.item_notes')
              })}
            >
              Has note
            </span>
          </div>
          <div className="list-item-progress">
            {this.props.series.item.item_progress || '—'} / {this.props.series.episodes_total || '—'}
          </div>
          <div className="list-item-rating">
            <div
              className={cx({
                'list-item-rating-icon': true,
                'icon-heart-empty': this.props.series.item.item_rating === 0,
                'icon-heart-full': this.props.series.item.item_rating > 0
              })}
            >
            </div>
            {
              this.props.series.item.item_rating ?
              (this.props.series.item.item_rating / 2).toFixed(1)
              : '—'
            }
          </div>
          <div className="list-item-type">
            {this.props.series.type}
          </div>
        </div>
        {
          this.state.expanded || this.state.expansionMounted ?
            <ListItemExpansion
              expanded={this.state.expanded}
              id={this.props.series._id}
              series={this.props.series}
              currentList={this.props.currentList}
              addItem={this.props.addItem}
              removeItem={this.handleRemoveItem}
              updateItem={this.handleUpdateItem}
              upsertItem={this.handleUpdateItem}
            />
          : null
        }
      </div>
    );
  }
}

ListItem.propTypes = {
  listSortBy: PropTypes.string.isRequired,
  series: PropTypes.object.isRequired,
  seriesType: PropTypes.string.isRequired,
  currentList: PropTypes.arrayOf(PropTypes.object).isRequired,

  // Action
  showSeries: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  upsertItem: PropTypes.func.isRequired
};

export default ListItem;
