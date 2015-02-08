exports = module.exports = {};

exports.simple = function(bitmap, transform){
  var i;
  for(i = 1; i <= bitmap.length; i++){
    var value = bitmap.readUInt8(i - 1);
    bitmap[i - 1] = transform(value, i)
  }
  return bitmap;
}
