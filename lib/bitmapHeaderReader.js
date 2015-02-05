exports = module.exports = {}

exports.readHeader = function(bitmap){
  var bitmapObject = {};

  bitmapObject.type = bitmap.toString('utf-8', 0, 2);
  bitmapObject.size = bitmap.readUInt32LE(2);
  bitmapObject.startOfPixels = bitmap.readUInt32LE(10);
  bitmapObject.width = bitmap.readUInt32LE(18);
  bitmapObject.height = bitmap.readUInt32LE(22);
  bitmapObject.colorDepth = bitmap.readUInt16LE(28);
  bitmapObject.paletteSize = bitmap.readUInt32LE(46);
  return bitmapObject;
}
