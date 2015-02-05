
var expect = require('chai').expect;
var app = require('../lib/bitmap-header-reader.js');

describe('Header Reader Module', function() {
  describe('#readHeader()', function() {
    var header;
    before(function() {
      var seg1 = 'Qk1GKwAAAAAAADYEAAAoAAAAZAAAAGQAAAAB';
      var seg2 = 'AAgAAAAAABAnAAASCwAAEgsAAAABAAAAAQAA';
      header = new Buffer(seg1 + seg2, 'base64');
    });

    it('should get correct file type', function() {
      var results = app.readHeader(header).type;

      expect(results).to.eql('BM');
    });

    it('should get correct information from pixel offset field', function() {
      var results = app.readHeader(header).startOfPixels;

      expect(results).to.eql(1078);
    });
  });
});
