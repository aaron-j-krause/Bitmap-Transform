exports = module.exports = {};

exports.rainbow = function(value, index) {
  return index % 4 === 0 && index !== 0 ? value : 255 - value;
};

exports.inverse = function(value, index) {
  return 255 - value;
};

exports.random = function(value, index) {
  var modPlus = Math.floor((Math.random() * 255 - value) / 2);
  var modMinus = Math.floor((Math.random() * value) / 2);
  return value % 2 === 0 ? value + modPlus : value - modMinus;
};

exports.rainbowMachine = function(value, index) {
  return value < 10 ? 255 : value;
};
