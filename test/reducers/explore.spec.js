import { expect } from 'chai';

import * as reducers from '../../src/reducers/explore';
import * as actionTypes from '../../src/constants/actionTypes';

const mockResults = [{
  title: 'Aah! Megami-sama!'
}];

describe('explore reducers', () => {
  describe('featured', () => {
    it('should return new featured', () => {
      expect(reducers.featured([], {
        type: actionTypes.SHOW_FEATURED_SUCCESS,
        featured: mockResults
      })).to.equal(mockResults);
    });

    it('should return old featured on request', () => {
      expect(reducers.featured(mockResults, {
        type: actionTypes.SHOW_FEATURED_REQUEST,
        featured: 'INVALID_VALUE'
      })).to.equal(mockResults);
    });

    it('should return old featured on failure', () => {
      expect(reducers.featured(mockResults, {
        type: actionTypes.SHOW_FEATURED_FAILURE,
        featured: 'INVALID_VALUE'
      })).to.equal(mockResults);
    });
  });

  describe('collections', () => {
    it('should return new colletions', () => {
      expect(reducers.collections([], {
        type: actionTypes.SHOW_COLLECTIONS_SUCCESS,
        collections: mockResults
      })).to.equal(mockResults);
    });

    it('should return old colletions on request', () => {
      expect(reducers.collections(mockResults, {
        type: actionTypes.SHOW_COLLECTIONS_REQUEST,
        collections: 'INVALID COLLECTION'
      })).to.equal(mockResults);
    });

    it('should return old colletions on failure', () => {
      expect(reducers.collections([], {
        type: actionTypes.SHOW_COLLECTIONS_FAILURE,
        collections: 'INVALID COLLECTION'
      })).to.eql([]);
    });
  });
});
