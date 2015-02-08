exports = module.exports = {};

exports.readHeader = function(bitmap) {
  var headerInfo = {};

  headerInfo.type = bitmap.toString('utf-8', 0, 2);
  headerInfo.startOfPixels = bitmap.readUInt32LE(10);
  headerInfo.colorDepth = bitmap.readUInt16LE(28);
  headerInfo.paletteSize = bitmap.readUInt32LE(46);

  headerInfo.hasPalette = headerInfo.startOfPixels != 54
  return headerInfo;
};
