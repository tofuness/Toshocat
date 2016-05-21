import {
  createSelector,
  createStructuredSelector
} from 'reselect';
import _ from 'lodash';

// A bit dirty, but still good.
const isAnimeListPath = (state) => {
  return state.routing.locationBeforeTransitions.hash.indexOf('animelist') > -1;
};
const currentTypeFilter = (state) => {
  return isAnimeListPath(state) ?
    ['tv', 'movie', 'ova', 'special', 'ona', 'music']
    : ['manga', 'one shot', 'novel', 'manhua', 'doujin'];
};

export const listSortBy = (state) => state.listSortBy;
export const listSortOrder = (state) => state.listSortOrder;
export const currentList = (state) => state.currentList;
export const currentListName = (state) => state.currentListName;
export const listStatusFilter = (state) => state.listStatusFilter;
export const listTypeFilter = (state) => state.listTypeFilter;
export const listSearchQuery = (state) => state.listSearchQuery;
export const headerOrder = (state) => state.headerOrder;

export const visibleList = createSelector(
  [currentList, listStatusFilter, currentTypeFilter, listSortBy, listSortOrder, listSearchQuery],
  (list, status, types, sortBy, sortOrder, searchQuery) => {
    const tempList = _.chain(list)
    .filter((listItem) => {
      return types.indexOf(listItem.type) > -1;
    })
    .filter((listItem) => {
      return (
        searchQuery === '' ? listItem.item.item_status === status : true
        && listItem.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
      );
    })
    .sortBy((listItem) => {
      return _.get(listItem, sortBy);
    })
    .value();
    return sortOrder === 'asc' ? tempList : tempList.reverse();
  }
);
export const listStatusCount = createSelector(
  [currentList, currentTypeFilter],
  (list, types) => {
    return _.chain(list)
    .filter((listItem) => {
      return types.indexOf(listItem.type) > -1;
    })
    .countBy((listItem) => {
      return listItem.item.item_status;
    })
    .value();
  }
);
export const visibleListIsEmpty = createSelector(
  [listStatusCount],
  (statusCount) => {
    return !!!_.chain(statusCount)
    .values()
    .reduce((total, n) => total + n)
    .value();
  }
);

export default createStructuredSelector({
  listSortBy,
  listSortOrder,
  currentList,
  visibleListIsEmpty,
  currentListName,
  listStatusFilter,
  listTypeFilter,
  visibleList,
  listStatusCount,
  listSearchQuery,
  headerOrder
});
