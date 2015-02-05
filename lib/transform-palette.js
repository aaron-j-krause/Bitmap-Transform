exports = module.exports = {};

exports.transformPalette = function(bitmap, transform) {
  var palette = [];
  var color = [];
  var counter = 1;
  var i;
  var j;

  for (i = 54; i < 1078; i++) {
    color.push(bitmap.readUInt8(i));
    counter++;
    if (counter % 5 === 0) {
      palette.push(color);
      color = [];
      counter = 1;
    }
  }

  palette = transform(palette).reduce(function(a, b) {return a.concat(b);});

  for (i = 54, j; i < 1078; i++) {
    j = i - 54;
    bitmap[i] = palette[j];
  }

  return bitmap;
};
