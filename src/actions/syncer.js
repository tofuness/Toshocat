import toshoStore from '../utils/store';
import SyncerFactory from '../syncers/SyncerFactory';

import * as toastActions from './toast';
import * as listActions from './list';

export function switchToToshocat() {
  return (dispatch) => {
    dispatch(listActions.switchSyncer(null));
    dispatch(listActions.switchList('toshocat'));
    dispatch(
      toastActions.createToast({
        id: 'toshoswitch',
        type: 'success',
        message: 'Switched to Toshocat (offline mode)',
        timer: 3000
      })
    );
  };
}

export function switchToMyAnimeList() {
  return (dispatch) => {
    const malSyncer = new SyncerFactory({
      username: toshoStore.get('myanimelist.username'),
      password: toshoStore.get('myanimelist.password')
    }, 'MyAnimeList');

    dispatch(
      toastActions.createToast({
        id: 'malswitch',
        type: 'loading',
        message: 'Switching to MyAnimeList...',
      })
    );

    let completeList = [];
    malSyncer.authenticate()
    .then(() => {
      return malSyncer.getList('anime');
    })
    .then((animeList) => {
      completeList = completeList.concat(animeList);
      return malSyncer.getList('manga');
    })
    .then((mangaList) => {
      dispatch(listActions.syncList('myanimelist', completeList.concat(mangaList)));
      dispatch(listActions.switchList('myanimelist'));
      dispatch(listActions.switchSyncer(malSyncer));
      dispatch(
        toastActions.updateToast({
          id: 'malswitch',
          type: 'success',
          message: 'Switched to MyAnimeList',
          timer: 3000
        })
      );
    })
    .catch(() => {
      dispatch(
        toastActions.updateToast({
          id: 'malswitch',
          type: 'failure',
          message: 'Invalid credentials!',
          timer: 3000
        })
      );
    });
  };
}

export function switchToHummingbird() {
  return (dispatch) => {
    const hbSyncer = new SyncerFactory({
      username: toshoStore.get('hummingbird.username'),
      password: toshoStore.get('hummingbird.password')
    }, 'Hummingbird');

    dispatch(
      toastActions.createToast({
        id: 'hbswitch',
        type: 'loading',
        message: 'Switching to Hummingbird...',
      })
    );

    hbSyncer.authenticate()
    .then(() => {
      return hbSyncer.getList('anime');
    })
    .then((animeList) => {
      dispatch(listActions.syncList('hummingbird', animeList));
      dispatch(listActions.switchList('hummingbird'));
      dispatch(listActions.switchSyncer(hbSyncer));
      dispatch(
        toastActions.updateToast({
          id: 'hbswitch',
          type: 'success',
          message: 'Switched to Hummingbird',
          timer: 3000
        })
      );
    })
    .catch(() => {
      dispatch(
        toastActions.updateToast({
          id: 'hbswitch',
          type: 'failure',
          message: 'Invalid credentials!',
          timer: 3000
        })
      );
    });
  };
}
