import { expect } from 'chai';
import child_process from 'child_process';
import anitomy from '../../src/utils/anitomy';

describe('anitomy', () => {
  describe('parse', () => {
    it('should parse one anime file', (done) => {
      anitomy.parse(
        child_process,
        '[HorribleSubs] Kono Subarashii Sekai ni Shukufuku wo! - 04 [1080p].mkv',
        (parsedData) => {
          expect(parsedData).to.be.an('array');
          expect(parsedData.length).to.equal(1);
          done();
        }
      );
    });

    it('should parse multiple anime files', (done) => {
      anitomy.parse(
        child_process,
        [
          '[HorribleSubs] Kono Subarashii Sekai ni Shukufuku wo! - 04 [1080p].mkv',
          '[KappaSubs] Kono Subarashii Sekai ni Shukufuku wo! - 03 [1080p].mkv'
        ],
        (parsedData) => {
          expect(parsedData).to.be.an('array');
          expect(parsedData.length).to.equal(2);
          done();
        }
      );
    });
  });
});
