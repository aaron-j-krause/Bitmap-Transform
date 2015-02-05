var fs = require('fs');
var tester = require('./lib/bitmapHeaderReader.js');
//console.log(tester)
var bitmap = fs.readFileSync(process.argv[2]);
var header = tester.readHeader(bitmap);
for(var i in header){
  console.log(i + ': ' + header[i])
}