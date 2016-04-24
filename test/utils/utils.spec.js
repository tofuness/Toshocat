import { assert } from 'chai';
import utils from '../../src/utils';

describe('utils', () => {
  describe('mod', () => {
    it('should give correct remainder for postive numbers', () => {
      assert.strictEqual(0, utils.mod(5, 5));
      assert.strictEqual(4, utils.mod(4, 5));
      assert.strictEqual(2, utils.mod(102, 5));
    });

    it('should give correct remainder for negative numbers', () => {
      assert.strictEqual(0, utils.mod(-5, 5));
      assert.strictEqual(1, utils.mod(-4, 5));
      assert.strictEqual(3, utils.mod(-102, 5));
    });
  });

  describe('isUrl', () => {
    it('should return true for a URL', () => {
      assert.equal(true, utils.isUrl('http://google.com'));
      assert.equal(true, utils.isUrl('https://google.com'));
      assert.equal(true, utils.isUrl('https://google.com/'));
      assert.equal(true, utils.isUrl('https://google.com/?random=123'));
    });
    it('should return false for invalid URL', () => {
      assert.equal(false, utils.isUrl('/google.com'));
      assert.equal(false, utils.isUrl('https:/google.com'));
      assert.equal(false, utils.isUrl('google.com'));
    });
  });

  describe('isAnime', () => {
    it('should return true if provided type is from anime', () => {
      assert.equal(true, utils.isAnime('TV'));
      assert.equal(true, utils.isAnime('Movie'));
      assert.equal(true, utils.isAnime('OVA'));
      assert.equal(true, utils.isAnime('Special'));
      assert.equal(true, utils.isAnime('ONA'));
      assert.equal(true, utils.isAnime('Music'));
    });
    it('should return true if provided type is not from anime', () => {
      assert.equal(false, utils.isAnime('NOTANIMELMAO'));
    });
  });
});
