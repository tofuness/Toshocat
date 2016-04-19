import { expect } from 'chai';
import Syncer from '../../src/syncers/Syncer';

describe('Syncer', () => {
  it('constructor should have username/password properties', () => {
    const syncer = new Syncer({ username: 'kappa', password: 'ross' }, 'SOME_API_BASE');
    expect(syncer.credentials).to.eql({ username: 'kappa', password: 'ross' });
    expect(syncer.APIBase).to.eql('SOME_API_BASE');
  });
});
