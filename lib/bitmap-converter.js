exports = module.exports = {};

exports.withoutPalette = function(bitmap, transform) {
  var header;
  var rgbArray = [];
  var group = [];
  var counter = 1;
  var buffer = [];

  bitmap = bitmap.toJSON();
  header = bitmap.splice(0, 54);

  for (var i = 0; i < bitmap.length; i++) {
    group.push(bitmap[i]);
    counter++;
    if (counter % 5 === 0) {
      rgbArray.push(group);
      counter = 1;
      group = [];
    }
  }

  rgbArray = transform(rgbArray);

  buffer.push(new Buffer(header));
  for (i = 0; i < rgbArray.length; i++) {
    buffer.push(new Buffer(rgbArray[i]));
  }

  return Buffer.concat(buffer);
};

exports.withPalette = function(bitmap, transform) {
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
