var fs = require('fs');
var transform = require('./lib/transformations.js');
var converter = require('./lib/bitmap-converter.js');
var reader = require('./lib/bitmap-header-reader.js');

var path = process.argv[2];
var bitmap = fs.readFileSync(path);
var headerInfo = reader.readHeader(bitmap);

console.log(headerInfo);
if (headerInfo.type != 'BM') throw new Error('I ain\'t even gonna fuck with this');
var end = headerInfo.hasPalette ? bitmap.length : headerInfo.startOfPixels;
var modifiable = bitmap.slice(54, end);

converter.simple(modifiable, transform.random);

path = path.replace(/.bmp/, '-transformed.bmp');
fs.writeFileSync(path, bitmap);
