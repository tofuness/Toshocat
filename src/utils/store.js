import _ from 'lodash';

export default {
  // Just makes sure we don't mix up lists and other kv pairs.
  getList(listName) {
    const currentList = this.get(`list.${listName}`);
    return _.isEmpty(currentList) ? [] : currentList;
  },
  saveList(listName, list) {
    return this.set(`list.${listName}`, list);
  },
  get(key) {
    let currentStore = localStorage.getItem(key);
    if (currentStore === null) {
      currentStore = {};
    } else {
      currentStore = JSON.parse(currentStore);
    }
    return currentStore;
  },
  set(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
  }
};
