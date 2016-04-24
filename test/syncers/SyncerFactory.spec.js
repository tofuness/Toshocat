import { expect } from 'chai';
import SyncerFactory from '../../src/syncers/SyncerFactory';
import HummingbirdSyncer from '../../src/syncers/HummingbirdSyncer';
import MyAnimeListSyncer from '../../src/syncers/MyAnimeListSyncer';

describe('SyncerFactory', () => {
  it('should return false by default', () => {
    expect(() => new SyncerFactory()).to.throw(Error);
  });
  it('should create Hummingbird syncer', () => {
    expect(new SyncerFactory({}, 'Hummingbird')).to.be.instanceof(HummingbirdSyncer);
  });
  it('should create MyAnimeList syncer', () => {
    expect(new SyncerFactory({}, 'MyAnimeList')).to.be.instanceof(MyAnimeListSyncer);
  });
});
