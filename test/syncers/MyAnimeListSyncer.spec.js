import nock from 'nock';
import sinon from 'sinon';
import { expect } from 'chai';
import mockList from '../fixtures/list';

import store from '../../src/utils/store';
import Syncer from '../../src/syncers/Syncer';
import MyAnimeListSyncer from '../../src/syncers/MyAnimeListSyncer';

describe('MyAnimeListSyncer', () => {
  let malSyncer;
  beforeEach(() => {
    malSyncer = new MyAnimeListSyncer({
      username: 'john',
      password: 'smith'
    }, 'https://atarashii.toshocat.com/2');
    sinon.stub(store, 'set').returns(undefined);
    sinon.stub(store, 'get').returns(undefined);
  });
  afterEach(() => {
    store.set.restore();
    store.get.restore();
    nock.cleanAll();
  });
  it('should inherit from Syncer', () => {
    expect(malSyncer).to.be.instanceof(Syncer);
  });
  describe('authenticate', () => {
    it('should authenticate', () => {
      nock('https://atarashii.toshocat.com/2')
      .get('/account/verify_credentials')
      .basicAuth({
        user: 'john',
        pass: 'smith'
      })
      .reply(200, 'kappa123');

      return malSyncer.authenticate()
      .then(() => {
        expect(malSyncer.authenticated).to.equal(true);
      });
    });
    it('should handle failed aithentication', () => {
      nock('https://atarashii.toshocat.com/2')
      .get('/account/verify_credentials')
      .basicAuth({
        user: 'john',
        pass: 'smith'
      })
      .reply(401, {});

      return malSyncer.authenticate()
      .catch((err) => {
        expect(err).to.be.an('error');
        expect(malSyncer.authenticated).to.equal(false);
      });
    });
  });
  describe('getList', () => {
    it('should not get list if not authenticated', () => {
      return malSyncer.getList('anime')
      .catch((err) => {
        expect(err).to.equal('not authenticated');
      });
    });
    it('should not get list if no list type is provided', () => {
      return malSyncer.getList()
      .catch((err) => {
        expect(err).to.equal('no list type was provided');
      });
    });
    it('should get anime list', () => {
      malSyncer.authenticated = true;
      nock('https://dalian.toshocat.com/myanimelist/list/anime')
      .get('/john')
      .reply(200, mockList.list);

      return malSyncer.getList('anime')
      .then((res) => {
        expect(res).to.eql(mockList.list);
      });
    });
    it('should handle errors', () => {
      malSyncer.authenticated = true;
      nock('https://dalian.toshocat.com/myanimelist/list/anime')
      .get('/john')
      .reply(500, {});

      return malSyncer.getList('anime')
      .catch((err) => {
        expect(err).to.be.an('error');
      });
    });
    it('should handle unknown status codes', () => {
      malSyncer.authenticated = true;
      nock('https://dalian.toshocat.com/myanimelist/list/anime')
      .get('/john')
      .reply(201, {});

      return malSyncer.getList('anime')
      .catch((err) => {
        expect(err).to.be.an('error');
      });
    });
  });
});
