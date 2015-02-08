var fs = require('fs');
var expect = require('chai').expect;
var app = require('../index.js');

describe('Index', function(){
  var temp;
  var file;
  before(function() {
    var temp = process.argv;
    process.argv = ['node', 'index.js', '/bmp/test.bmp'];

  })

  after(function(){
    process.argv = temp;
  })
  describe('argv', function() {
    it('should call a file from argv', function() {

    });
  });
});