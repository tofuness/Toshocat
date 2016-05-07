import nock from 'nock';
import sinon from 'sinon';
import { expect } from 'chai';
import mockList from '../fixtures/list';

import store from '../../src/utils/store';
import Syncer from '../../src/syncers/Syncer';
import HummingbirdSyncer from '../../src/syncers/HummingbirdSyncer';

describe('HummingbirdSyncer', () => {
  let hbSyncer;
  beforeEach(() => {
    hbSyncer = new HummingbirdSyncer({
      username: 'john',
      password: 'smith'
    }, 'https://dalian.toshocat.com/hummingbird');
    sinon.stub(store, 'set').returns(undefined);
    sinon.stub(store, 'get').returns(undefined);
  });
  afterEach(() => {
    store.set.restore();
    store.get.restore();
    nock.cleanAll();
  });
  it('should inherit from Syncer', () => {
    expect(hbSyncer).to.be.instanceof(Syncer);
  });
  describe('authenticate', () => {
    it('should authenticate', () => {
      nock('https://hummingbird.me/api/v1/users/')
      .post('/authenticate', {
        username: 'john',
        password: 'smith'
      })
      .reply(201, 'kappa123');
      return hbSyncer.authenticate()
      .then(() => {
        expect(store.set.callCount).to.equal(1);
        expect(hbSyncer.authenticated).to.equal(true);
      });
    });
    it('should handle failed authentication', () => {
      nock('https://hummingbird.me/api/v1/users/')
      .post('/authenticate', {
        username: 'john',
        password: 'smith'
      })
      .reply(401, { error: 'Invalid credentials' });
      return hbSyncer.authenticate()
      .catch(() => {
        expect(store.set.callCount).to.equal(0);
        expect(hbSyncer.authenticated).to.equal(false);
      });
    });
  });
  describe('getList', () => {
    it('should reject if not authenticated', () => {
      return hbSyncer.getList('anime')
      .catch((err) => {
        expect(err).to.equal('not authenticated');
      });
    });
    it('should get list', () => {
      // Skip authentication
      hbSyncer.authenticated = true;
      nock('https://dalian.toshocat.com/hummingbird/list/anime')
      .get('/john')
      .reply(200, mockList.list);

      return hbSyncer.getList('anime')
      .then((resList) => {
        expect(resList).to.eql(mockList.list);
      });
    });
    it('should handle errors', () => {
      // Skip authentication
      hbSyncer.authenticated = true;
      nock('https://dalian.toshocat.com/hummingbird/list/anime')
      .get('/john')
      .reply(500, {});

      return hbSyncer.getList('anime')
      .catch((err) => {
        expect(err).to.be.an('error');
      });
    });
    it('should handle unknown status', () => {
      // Skip authentication
      hbSyncer.authenticated = true;
      nock('https://dalian.toshocat.com/hummingbird/list/anime')
      .get('/john')
      .reply(201, {});

      return hbSyncer.getList('anime')
      .catch((err) => {
        expect(err).to.be.an('error');
      });
    });
    it('should not get list if no list type is provided', () => {
      return hbSyncer.getList()
      .catch((err) => {
        expect(err).to.equal('no list type was provided');
      });
    });
  });
  describe('addListItem', () => {
    beforeEach(() => {
      sinon.stub(hbSyncer, 'updateListItem');
    });
    afterEach(() => {
      hbSyncer.updateListItem.restore();
    });
    it('should not add if not authenticatd', () => {
      return hbSyncer.addListItem({})
      .catch((err) => {
        expect(err).to.equal('not authenticated');
      });
    });
    it('should add to online list', () => {
      hbSyncer.authenticated = true;
      nock('https://hummingbird.me/api/v2/anime/', {
        reqheaders: {
          'X-Client-Id': '8ffb362312794d6218b0'
        }
      })
      .get('/myanimelist:1')
      .reply(200, { anime: { id: 2 } });

      return hbSyncer.addListItem({ mal_id: 1, item: {} }).then(() => {
        expect(hbSyncer.updateListItem.callCount).to.equal(1);
      });
    });
    it('should handle mal -> hb id error', () => {
      hbSyncer.authenticated = true;
      nock('https://hummingbird.me/api/v2/anime/', {
        reqheaders: {
          'X-Client-Id': '8ffb362312794d6218b0'
        }
      })
      .get('/myanimelist:1')
      .reply(500, {});

      return hbSyncer.addListItem({ mal_id: 1, item: {} }).catch((err) => {
        expect(err).to.be.an('error');
      });
    });
  });

  describe('updateListItem', () => {
    it('should not update if not authenticated', () => {
      return hbSyncer.updateListItem({})
      .catch((err) => {
        expect(err).to.equal('not authenticated');
      });
    });
    it('should update online list', () => {
      hbSyncer.authenticated = true;
      const listItem = {
        hb_id: 1,
        item: {}
      };

      nock('http://hummingbird.me/api/v1/libraries/')
      .post('/1')
      .reply(200, {});

      return hbSyncer.updateListItem(listItem)
      .then((res) => {
        expect(res).to.eql({});
      });
    });
    it('should rekect if update did not succeed', () => {
      hbSyncer.authenticated = true;
      const listItem = {
        hb_id: 1,
        item: {}
      };

      nock('http://hummingbird.me/api/v1/libraries/')
      .post('/1')
      .reply(500, {});

      return hbSyncer.updateListItem(listItem)
      .catch((res) => {
        expect(res).to.be.an('error');
      });
    });
  });
  describe('removeListItem', () => {
    it('should not remove it not authenticated', () => {
      return hbSyncer.removeListItem({})
      .catch((err) => {
        expect(err).to.equal('not authenticated');
      });
    });
    it('should remove list item', () => {
      hbSyncer.authenticated = true;
      const listItem = {
        hb_id: 123
      };

      nock('http://hummingbird.me/api/v1/libraries/')
      .post('/123/remove')
      .reply(200, {});

      return hbSyncer.removeListItem(listItem)
      .then((res) => {
        expect(res).to.eql({});
      });
    });
    it('should reject if removal did not succeed', () => {
      hbSyncer.authenticated = true;
      const listItem = {
        hb_id: 123
      };

      nock('http://hummingbird.me/api/v1/libraries/')
      .post('/123/remove')
      .reply(500, {});

      return hbSyncer.removeListItem(listItem)
      .catch((err) => {
        expect(err).to.be.an('error');
      });
    });
  });
});
