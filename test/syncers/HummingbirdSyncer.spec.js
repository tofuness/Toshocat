import { expect } from 'chai';
import Syncer from '../../src/syncers/Syncer';
import HummingbirdSyncer from '../../src/syncers/HummingbirdSyncer';

describe('HummingbirdSyncer', () => {
  it('should inherit from Syncer', () => {
    const hbSyncer = new HummingbirdSyncer({}, '');
    expect(hbSyncer instanceof Syncer).to.equal(true);
  });
});
