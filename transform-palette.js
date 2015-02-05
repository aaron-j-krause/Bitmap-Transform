exports = module.exports = {}

var bitmap = fs.readFileSync('./test.bmp');
exports.transformPalette = function(bitmap, transform){
  var palette = [], color = [], counter = 1;
  for(var i = 54; i < 1078; i++){
    color.push(bitmap.readUInt8(i));
    counter++
    if(counter % 5 == 0){
      palette.push(color);
      color = [];
      counter = 1;
    }
  }
  palette = transform(palette).reduce(function(a,b){return a.concat(b)});
  console.log(palette.length)
  for (var i = 54, j; i < 1078; i++) {
    j = i - 54;
    bitmap[i] = palette[j];
  };
  return bitmap;
}
fs.writeFileSync('./modTest.bmp', bitmap);