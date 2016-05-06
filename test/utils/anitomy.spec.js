import { expect } from 'chai';
import anitomy from '../../src/utils/anitomy';

describe('anitomy', () => {
  describe('parse', () => {
    it('should parse one filename', function(done) {
      anitomy.parse('[HorribleSubs] Kono Subarashii Sekai ni Shukufuku wo! - 04 [1080p].mkv',
        (parsedData) => {
          expect(parsedData).to.be.an('array');
          expect(parsedData.length).to.equal(1);
          done();
        }
      );
    });
    it('should parse multiple filenames', function(done) {
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
    describe('should not parse anything when', () => {
      it('filename is undefined', function(done) {
        anitomy.parse(undefined, (parsedData) => {
          expect(parsedData).to.equal(false);
          done();
        });
      });
      it('filename is null', function(done) {
        anitomy.parse(null, (parsedData) => {
          expect(parsedData).to.equal(false);
          done();
        });
      });
      it('filename is empty array', function(done) {
        anitomy.parse([], (parsedData) => {
          expect(parsedData).to.equal(false);
          done();
        });
      });
    });
  });
});
