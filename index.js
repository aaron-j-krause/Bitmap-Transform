var fs = require('fs');
var transform = require('./lib/transformations.js');
var converter = require('./lib/bitmap-converter.js');
var reader = require('./lib/bitmapHeaderReader.js');

var path = process.argv[2];
var bitmap = fs.readFileSync(path);
var headerInfo = reader.readHeader(bitmap);
console.log(headerInfo);

if (headerInfo.type === 'BM' && headerInfo.startOfPixels != 54) {
  bitmap = converter.withPalette(bitmap, transform.inverse);
} else if (headerInfo.type === 'BM' && headerInfo.startOfPixels == 54) {
  bitmap = converter.withoutPalette(bitmap, transform.rainbowMachine);
} else {
  throw new Error('I ain\'t even gonna fuck with this');
}

path = path.replace(/.bmp/, '-transformed.bmp');
fs.writeFileSync(path, bitmap);
