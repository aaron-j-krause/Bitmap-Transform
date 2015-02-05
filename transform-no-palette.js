var fs = require('fs');
var transform = require('./lib/transformations.js');
var converter = require('./lib/buffer-converter.js');

var bitmap = fs.createReadStream('./bmp/dog.bmp');
var header, bitmapData = [], bufferArray = [];

bitmap.on('data', function(data) {
  bitmapData.push(data.toJSON());
});


bitmap.on('end', function () {
  var header, buffer, rgbArray = [];

  bitmapData = bitmapData.reduce(function(a,b){
    return a.concat(b);
  })

  header = bitmapData.splice(0,54);

  rgbArray = converter.breakDownPixelArray(bitmapData);

  rgbArray = transform.rainbow(rgbArray);

  buffer = converter.reconstructBuffer(header, rgbArray);

  fs.writeFileSync('./bmp/newDog.bmp',buffer)

});


exports = module.exports = {}
