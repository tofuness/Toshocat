import { assert } from 'chai';
import child_process from 'child_process';
import anitomy from '../../src/utils/anitomy';

describe('anitomy', () => {
  describe('parse', () => {
    it('should parse anime file name', (done) => {
      anitomy.parse(
        child_process,
        '[HorribleSubs] Kono Subarashii Sekai ni Shukufuku wo! - 04 [1080p].mkv',
        (parsedData) => {
          assert.isObject(parsedData, 'return value from .parse is an object');
          done();
        }
      );
    });
  });
});
