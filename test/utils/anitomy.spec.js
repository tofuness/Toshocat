import { expect } from 'chai';
import anitomy from '../../src/utils/anitomy';

describe('anitomy', () => {
  describe('parse', () => {
    it('should parse one filename', (done) => {
      anitomy.parse('[HorribleSubs] Kono Subarashii Sekai ni Shukufuku wo! - 04 [1080p].mkv',
        (parsedData) => {
          expect(parsedData).to.be.an('array');
          expect(parsedData.length).to.equal(1);
          done();
        }
      );
    });

    it('should parse multiple filenames', (done) => {
      anitomy.parse([
        '[HorribleSubs] Kono Subarashii Sekai ni Shukufuku wo! - 04 [1080p].mkv',
        '[KappaSubs] Kono Subarashii Sekai ni Shukufuku wo! - 03 [1080p].mkv'
      ],
      (parsedData) => {
        expect(parsedData).to.be.an('array');
        expect(parsedData.length).to.equal(2);
        done();
      });
    });
  });
});
