exports = module.exports = {};

exports.breakDownPixelArray = function(array){
  var group = [], counter = 1, result = [];
  for (var i = 0; i < array.length; i++) {
    group.push(array[i]);
    counter++;
    if(counter % 5 == 0){
      result.push(group);
      counter = 1;
      group = [];
    }
  };
  return result;
}

exports.reconstructBuffer = function(header, pixelArray){
  var buffer = [];
  buffer.push(new Buffer(header));
  for (var i = 0; i < pixelArray.length; i++) {
    buffer.push(new Buffer(pixelArray[i]))
  };
  return Buffer.concat(buffer);
}