gvar expect = require('chai').expect;
var app = require('../lib/bitmap-converter.js');
var transform = require('../lib/transformations.js');

describe('Conversion Module', function() {
  var dummyTransform;
  var dummyBuffer;

  beforeEach(function() {
    dummyTransform = function(array) {
      return [].map.call(array, function(n) {
        n[0]--;
        return n;
      });
    };

    var pixel = [255, 255, 255, 0];
    body = [];
    for (var i = 0; i < 1100; i++) {
      body.push(pixel);
    }

    var body = new Buffer(body.reduce(function(a, b) {return a.concat(b);}));
    var seg1 = 'Qk1GKwAAAAAAADYEAAAoAAAAZAAAAGQAAAAB';
    var seg2 = 'AAgAAAAAABAnAAASCwAAEgsAAAABAAAAAQAA';
    var header = new Buffer(seg1 + seg2, 'base64');

    dummyBuffer = Buffer.concat([header, body]);
  });

  describe('#withoutPalette()', function() {
    it('should return a buffer', function() {
      var results = app.withoutPalette(dummyBuffer, dummyTransform);

      expect(Buffer.isBuffer(results)).to.eql(true);
    });

    it('should not alter the buffer length', function() {
      var results = app.withoutPalette(dummyBuffer, dummyTransform);

      expect(results.length).to.eql(dummyBuffer.length);
    });

    it('should run passed in transform', function() {
      var conversion = app.withoutPalette(dummyBuffer, dummyTransform);
      var results = conversion.slice(54, 58).toJSON();

      expect(results).to.eql([254, 255, 255, 0]);
    });
  });

  describe('#withPalette()', function() {
    it('should return a buffer', function() {
      var results = app.withPalette(dummyBuffer, dummyTransform);

      expect(Buffer.isBuffer(results)).to.eql(true);
    });

    it('should not alter the buffer length', function() {
      var results = app.withPalette(dummyBuffer, dummyTransform);

      expect(results.length).to.eql(dummyBuffer.length);
    });

    it('should run passed in transform', function() {
      var conversion = app.withPalette(dummyBuffer, dummyTransform);
      var results = conversion.slice(54, 58).toJSON();

      expect(results).to.eql([254, 255, 255, 0]);
    });
  });
});
