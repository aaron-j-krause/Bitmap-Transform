var fs = require('fs');
var transform = require('./lib/transformations.js');
var converter = require('./lib/buffer-converter.js');
var reader = require('./lib/bitmapHeaderReader.js');
var parse = require('./lib/transform-palette.js');

var bitmap = fs.readFileSync('./bmp/dog.bmp');
var headerInfo = reader.readHeader(bitmap);
console.log(headerInfo);

if (headerInfo.type === 'BM' && headerInfo.startOfPixels != 54) {
  bitmap = parse.transformPalette(bitmap, transform.inverse);
} else if (headerInfo.type === 'BM' && headerInfo.startOfPixels == 54) {
  bitmap = converter.returnArrayAndHeader(bitmap, transform.rainbow);
} else {
  throw new Error('I ain\'t even gonna fuck with this');
}

fs.writeFileSync('./bmp/newDog.bmp', bitmap);
