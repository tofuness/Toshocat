import Syncer from './Syncer';
import utils from '../utils';
import mapReplace from 'mapreplace';
import request from 'superagent';

class MyAnimeListSyncer extends Syncer {
  authenticate() {
    return new Promise((resolve, reject) => {
      request
      .get(`${this.APIBase}/account/verify_credentials`)
      .auth(this.credentials.username, this.credentials.password)
      .end((err, res) => {
        if (err) {
          this.authenticated = false;
          reject(err);
        } else if (res.status === 200) {
          this.authenticated = true;
          resolve();
        } else {
          this.authenticated = false;
          reject(new Error('Could not authenticate MyAnimeList account'));
        }
      });
    });
  }
  getList(type) {
    if (!type) return Promise.reject('no list type was provided');
    if (!this.authenticated) return Promise.reject('not authenticated');
    return new Promise((resolve, reject) => {
      request
      .get(`https://dalian.toshocat.com/myanimelist/list/${type}/${this.credentials.username}`)
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
    const listType = utils.isAnime(series.type) ? 'anime' : 'manga';
    const { item } = series;

    return new Promise((resolve, reject) => {
      request
      .post(`${this.APIBase}/${listType}list/${listType}`)
      .auth(this.credentials.username, this.credentials.password)
      .send({
        manga_id: series.mal_id,
        anime_id: series.mal_id,
        status: mapReplace(item.item_status, {
          current: 'watching',
          planned: 'plantowatch'
        }),
        episodes: item.item_progress,
        score: item.item_rating
      })
      .end((err, res) => {
        if ([200, 201].indexOf(res.status) > -1) {
          resolve();
        } else {
          reject(new Error('Could not add MyAnimeList entry'));
        }
      });
    });
  }
  updateListItem(series) {
    const listType = utils.isAnime(series.type) ? 'anime' : 'manga';
    const { item } = series;

    return new Promise((resolve, reject) => {
      request
      .put(`${this.APIBase}/${listType}list/${listType}/${series.mal_id}`)
      .auth(this.credentials.username, this.credentials.password)
      .send({
        status: mapReplace(item.item_status, {
          current: 'watching',
          planned: 'plantowatch'
        }),
        episodes: item.item_progress,
        chapters: item.item_progress,
        score: item.item_rating,
        comments: item.item_notes
      })
      .end((err, res) => {
        if ([200, 201].indexOf(res.status) > -1) {
          resolve();
        } else {
          reject(new Error('Could not update MyAnimeList entry'));
        }
      });
    });
  }
  removeListItem(series) {
    const listType = utils.isAnime(series.type) ? 'anime' : 'manga';

    return new Promise((resolve, reject) => {
      request
      .delete(`${this.APIBase}/${listType}list/${listType}/${series.mal_id}`)
      .auth(this.credentials.username, this.credentials.password)
      .end((err, res) => {
        if ([200, 201].indexOf(res.status) > -1) {
          resolve();
        } else {
          reject(new Error('Could not remove MyAnimeList entry'));
        }
      });
    });
  }
}

export default MyAnimeListSyncer;
