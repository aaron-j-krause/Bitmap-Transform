var fs = require('fs');
var transform = require('./lib/transformations.js');
var convert = require('./lib/bitmap-converter.js');
var reader = require('./lib/bitmap-header-reader.js');

var path = process.argv[2];
var transformation = transform[process.argv[3]] || transform.inverse;
var bitmap = fs.readFileSync(path);
var headerInfo = reader.readHeader(bitmap);
var HEADER_SIZE = 54;

console.log(headerInfo);
if (headerInfo.type != 'BM') {
  throw new Error('I ain\'t even gonna fuck with this');
}
var end = headerInfo.hasPalette ? headerInfo.startOfPixels : bitmap.length;
var modifiable = bitmap.slice(HEADER_SIZE, end);

convert.convert(modifiable, transformation);

path = path.replace(/.bmp/, '-transformed.bmp');
fs.writeFileSync(path, bitmap);
