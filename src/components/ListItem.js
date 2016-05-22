import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import ListItemExpansion from './ListItemExpansion';

import listUtils from '../utils/list';
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
    if (
      nextProps.series !== this.props.series
      || this.state !== nextState
      || nextProps.headerOrder !== this.props.headerOrder
    ) {
      return true;
    }
    return false;
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
      _.get(item, this.props.listSortBy) === _.get(this.props.series, this.props.listSortBy)
      && _.get(item, 'item.item_status') === _.get(this.props.series, 'item.item_status')
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
  onIncrement = () => {
    this.props.incrementProgress(this.props.series, 1);
  }
  toggleExpansion(e) {
    if (!['list-item-link', 'list-item-increment'].includes(e.target.className)) {
      this.setState({
        expanded: !this.state.expanded
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
          {
            this.props.headerOrder.map((header) => {
              switch (header.name) {
                case 'Title': {
                  return (
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
                  );
                }
                case 'Progress': {
                  return (
                    <div className="list-item-progress">
                      <div
                        className={cx({
                          'list-item-increment': true,
                          hidden: this.props.series.item.item_status === 'completed'
                        })}
                        onClick={this.onIncrement}
                      >+</div>
                      {this.props.series.item.item_progress || '—'} / {this.props.series.episodes_total || '—'}
                    </div>
                  );
                }
                case 'Rating': {
                  return (
                    <div className="list-item-rating">
                      <div
                        className={cx({
                          'list-item-rating-icon': true,
                          'icon-heart-empty': this.props.series.item.item_rating === 0,
                          'icon-heart-full': this.props.series.item.item_rating > 0
                        })}
                      >
                      </div>
                      {listUtils.formatRating(this.props.series.item.item_rating)}
                    </div>
                  );
                }
                case 'Type': {
                  return (
                    <div className="list-item-type">
                      {this.props.series.type}
                    </div>
                  );
                }
                default:
                  return null;
              }
            })
          }
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
  headerOrder: PropTypes.arrayOf(PropTypes.object).isRequired,

  // Action
  showSeries: PropTypes.func.isRequired,
  incrementProgress: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  upsertItem: PropTypes.func.isRequired
};

export default ListItem;
