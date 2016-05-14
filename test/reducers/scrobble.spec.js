import { expect } from 'chai';
import * as reducers from '../../src/reducers/scrobble';
import * as actionTypes from '../../src/constants/actionTypes';

describe('scrobble reducer', () => {
  describe('currentScrobble', () => {
    it('should return current scrobble by default', () => {
      expect(reducers.currentScrobble({ title: 'Gosick' }, {
        type: 'INVALID_ACTION',
        scrobble: 'SOMETHING_BAD'
      })).to.eql({ title: 'Gosick' });
    });
    it('should return new scrobble on request', () => {
      expect(reducers.currentScrobble({}, {
        type: actionTypes.SCROBBLE_REQUEST,
        scrobble: { title: 'Dimension W' }
      })).to.eql({ title: 'Dimension W' });
    });
    it('should return current scrobble on success', () => {
      expect(reducers.currentScrobble({ title: 'Kill la Kill' }, {
        type: actionTypes.SCROBBLE_SUCCESS,
        scrobble: 'SOMETHING_BAD'
      })).to.eql({ title: 'Kill la Kill' });
    });
    it('should clear current scrobble', () => {
      expect(reducers.currentScrobble({ title: 'Kiznaiver' }, {
        type: actionTypes.SCROBBLE_CLEAR
      })).to.eql({});
    });
  });
});
