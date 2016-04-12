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
});
