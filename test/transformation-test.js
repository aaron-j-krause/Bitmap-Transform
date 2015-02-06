var expect = require('chai').expect;
var app = require('../lib/transformations.js');

describe('Transformations Module', function() {
  var dummyBitmap;

  beforeEach(function() {
    var pixel = [255, 255, 255, 0];
    dummyBitmap = [];
    for (var i = 0; i < 10; i++) {
      dummyBitmap.push(pixel);
    }
  });

  describe('#inverse()', function() {
    it('should invert values', function() {
      var results = app.inverse(dummyBitmap)[0];

      expect(results).to.eql([0, 0, 0, 255]);
    });
  });

  describe('#random()', function() {
    it('should randomize value', function() {
      var results = app.random(dummyBitmap)[0];

      expect(results).to.not.eql([255, 255, 255, 0]);
    });
  });

  describe('#littleLessRandom()', function() {
    it('should randomize values', function() {
      var results = app.littleLessRandom(dummyBitmap)[0];

      expect(results).to.not.eql([255, 255, 255, 0]);
    });
  });

  describe('#whatEven()', function() {
    it('should randomize or something', function() {
      var results = app.whatEven(dummyBitmap)[0];

      expect(results).to.not.eql([255, 255, 255, 0]);
    });
  });

  describe('#rainbow()', function() {
    it('should change all values but the last', function() {
      var results = app.rainbow(dummyBitmap)[0];

      expect(results).to.eql([0, 0, 0, 0]);
    });
  });

  describe('#rainbowMachine()', function() {
    it('should max out low values', function() {
      var results = app.rainbowMachine(dummyBitmap)[0];

      expect(results).to.eql([255, 255, 255, 255]);
    });
  });
});
