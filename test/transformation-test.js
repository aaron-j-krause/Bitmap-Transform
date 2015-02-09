var expect = require('chai').expect;
var app = require('../lib/transformations.js');

describe('Transformations Module', function() {
  var bytes;

  beforeEach(function() {
    bytes = [255, 255, 255, 7];
  });

  describe('#inverse()', function() {
    it('should invert all values', function() {

      var results = bytes.map(function(b, i) {
        return app.inverse(b, i);
      });

      expect(results).to.eql([0, 0, 0, 248]);
    });
  });

  describe('#random()', function() {
    it('should randomize value', function() {

      var results = bytes.map(function(b, i) {
        return app.random(b, i);
      });

      expect(results).to.not.eql([255, 255, 255, 7]);
    });
  });

  describe('#rainbow()', function() {
    it('should change all values but the last', function() {

      var results = bytes.map(function(b, i) {
        i++;
        return app.rainbow(b, i);
      });

      expect(results).to.eql([0, 0, 0, 7]);
    });
  });

  describe('#rainbowMachine()', function() {
    it('should max out low values', function() {

      var results = bytes.map(function(b, i) {
        return app.rainbowMachine(b, i);
      });

      expect(results).to.eql([255, 255, 255, 255]);
    });
  });
});
