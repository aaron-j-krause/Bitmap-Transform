var expect = require('chai').expect;
var app = require('../lib/bitmap-converter.js');
var transform = require('../lib/transformations.js');

describe('Conversion Module', function() {
  var dummyTransform;
  var dummyBuffer;

  beforeEach(function() {
    dummyTransform = function(value, index) {
      return value - 1;
    };

    dummyBuffer = new Buffer([255, 255, 255, 1]);
  });

  describe('#convert()', function() {
    it('should still be a buffer', function() {
      app.convert(dummyBuffer, dummyTransform);

      expect(Buffer.isBuffer(dummyBuffer)).to.eql(true);
    });

    it('should run passed in transform', function() {
      app.convert(dummyBuffer, dummyTransform);
      var results = dummyBuffer.toJSON();

      expect(results).to.eql([254, 254, 254, 0]);
    });
  });
});
