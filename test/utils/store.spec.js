import toshoStore from '../../src/utils/store';
import mockList from '../fixtures/list';
import { expect } from 'chai';

describe('toshoStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
  });
  describe('saveList', () => {
    it('should save list', () => {
      expect(localStorage.length).to.equal(0);
      toshoStore.saveList('myanimelist', mockList.list);
      expect(localStorage.length).to.equal(1);
      expect(JSON.parse(localStorage.getItem('list.myanimelist'))).to.eql(mockList.list);
    });
  });
  describe('getList', () => {
    it('should get list', () => {
      expect(localStorage.length).to.equal(0);
      localStorage.setItem('list.myanimelist', JSON.stringify(mockList.list));
      expect(localStorage.length).to.equal(1);
      expect(toshoStore.getList('myanimelist')).to.eql(mockList.list);
    });
  });
  describe('set', () => {
    it('should set a key value pair', () => {
      expect(localStorage.length).to.equal(0);
      toshoStore.set('kappa', 'rino');
      expect(localStorage.length).to.equal(1);
      expect(JSON.parse(localStorage.getItem('kappa'))).to.equal('rino');
    });
  });
  describe('get', () => {
    it('should get a key value', () => {
      expect(localStorage.length).to.equal(0);
      localStorage.setItem('kappa', JSON.stringify('pride'));
      expect(localStorage.length).to.equal(1);
      expect(toshoStore.get('kappa')).to.equal('pride');
    });
    it('should return empty object if key doesn not exist', () => {
      expect(localStorage.length).to.equal(0);
      expect(toshoStore.get('DOESNOTEXIST')).to.eql({});
    });
  });
});
