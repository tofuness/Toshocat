import request from 'superagent';
import _ from 'lodash';

import Syncer from './Syncer';
import store from '../utils/store';
import mapReplace from 'mapreplace';

class HummingbirdSyncer extends Syncer {
  authenticate() {
    return new Promise((resolve, reject) => {
      request
      .post('https://hummingbird.me/api/v1/users/authenticate')
      .send({
        username: this.credentials.username,
        password: this.credentials.password
      })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else if (res.status === 201) {
          store.set('hummingbird.token', res.body);
          this.authenticated = true;
          resolve();
        } else {
          this.authenticated = false;
          reject();
        }
      });
    });
  }
  getList(type) {
    if (!type) return Promise.reject('no type was provided');
    if (!this.authenticated) return Promise.reject('not authenticated');
    return new Promise((resolve, reject) => {
      request
      .get(`${this.APIBase}/list/${type}/${this.credentials.username}`)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else if (res.status === 200) {
          resolve(res.body);
        } else {
          reject(new Error(`Could not find list for ${this.credentials.username}`));
        }
      });
    });
  }
  addListItem(series) {
    if (!this.authenticated) return Promise.reject('not authenticated');
    return new Promise((resolve, reject) => {
      request
      .get(`https://hummingbird.me/api/v2/anime/myanimelist:${series.mal_id}`)
      .set('X-Client-Id', '8ffb362312794d6218b0')
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          this.updateListItem(_.set(series, 'hb_id', JSON.parse(res.text).anime.id));
          resolve();
        }
      });
    });
  }
  updateListItem(series) {
    const { item } = series;
    if (!this.authenticated) return Promise.reject('not authenticated');
    return new Promise((resolve, reject) => {
      request
      .post(`http://hummingbird.me/api/v1/libraries/${series.hb_id}`)
      .send({
        auth_token: store.get('hummingbird.token'),
        rating: item.item_rating / 2,
        notes: item.item_notes,
        episodes_watched: item.item_progress,
        status: mapReplace(item.item_status, {
          current: 'currently-watching',
          planned: 'plan-to-watch',
          onhold: 'on-hold'
        })
      })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else if ([200, 201].indexOf(res.status) > -1) {
          resolve();
        } else {
          reject(new Error('Could not update Hummingbird entry'));
        }
      });
    });
  }
  removeListItem(series) {
    if (!this.authenticated) return Promise.reject('not authenticated');
    return new Promise((resolve, reject) => {
      request
      .post(`http://hummingbird.me/api/v1/libraries/${series.hb_id}/remove`)
      .send({
        auth_token: store.get('hummingbird.token')
      })
      .end((err, res) => {
        if ([200, 201].indexOf(res.status) > -1) {
          resolve();
        } else {
          reject(new Error('Could not remove Hummingbird entry'));
        }
      });
    });
  }
}

export default HummingbirdSyncer;
