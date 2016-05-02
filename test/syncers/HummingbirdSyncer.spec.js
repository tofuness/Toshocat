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
    expect(hbSyncer instanceof Syncer).to.equal(true);
  });
  describe('authenticate', () => {
    it('should authenticate', (done) => {
      nock('https://hummingbird.me/api/v1/users/')
      .post('/authenticate', {
        username: 'john',
        password: 'smith'
      })
      .reply(201, 'kappa123');
      hbSyncer.authenticate()
      .then(() => {
        expect(store.set.callCount).to.equal(1);
        expect(hbSyncer.authenticated).to.equal(true);
        done();
      })
      .catch(() => {
        throw new Error('authentication failed for hb syncer');
      });
    });
    it('should handle failed authentication', (done) => {
      nock('https://hummingbird.me/api/v1/users/')
      .post('/authenticate', {
        username: 'john',
        password: 'smith'
      })
      .reply(401, { error: 'Invalid credentials' });
      hbSyncer.authenticate()
      .then(() => {
        throw new Error('authentication should fail');
      })
      .catch(() => {
        expect(store.set.callCount).to.equal(0);
        expect(hbSyncer.authenticated).to.equal(false);
        done();
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
    it('should handle err', () => {
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
        expect(err).to.equal('no type was provided');
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
});
