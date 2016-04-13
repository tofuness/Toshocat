import { expect } from 'chai';

import * as reducers from '../../src/reducers/rss';
import * as actionTypes from '../../src/constants/actionTypes';

describe('rss reducers', () => {
  describe('RSSUrl', () => {
    it('should return new url', () => {
      expect(reducers.RSSUrl('', {
        type: actionTypes.SWITCH_RSS_URL,
        RSSUrl: 'https://google.com'
      })).to.equal('https://google.com');
    });

    it('should return current url on invalid url', () => {
      expect(reducers.RSSUrl('CURRENT_URL', {
        type: actionTypes.INVALID_RSS_URL
      })).to.equal('CURRENT_URL');
    });

    it('should return current url by default', () => {
      expect(reducers.RSSUrl('CURRENT_URL', {
        type: 'INVALID_ACTION_TYPE',
        RSSUrl: 'INVALID_URL'
      })).to.equal('CURRENT_URL');
    });
  });

  describe('RSS', () => {
    const dummyRSS = [{ title: 'Dantalian no Shoka' }];
    it('should return new RSS', () => {
      expect(reducers.RSS([], {
        type: actionTypes.SHOW_RSS_SUCCESS,
        RSS: dummyRSS
      })).to.equal(dummyRSS);
    });

    it('should return current RSS on failed request', () => {
      expect(reducers.RSS(dummyRSS, {
        type: actionTypes.SHOW_RSS_FAILURE,
        RSS: []
      })).to.eql(dummyRSS);
    });

    it('should return current RSS on request', () => {
      expect(reducers.RSS(dummyRSS, {
        type: actionTypes.SHOW_RSS_REQUEST,
        RSS: []
      })).to.eql(dummyRSS);
    });
  });
});
