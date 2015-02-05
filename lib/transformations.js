exports = module.exports = {};

exports.inverse = function(array) {
  return [].map.call(array, function(arr){
    return arr.map(function(color, i){
      return 255 - color;
    })
  })
}

exports.random = function(array){
  return [].map.call(array, function(arr){
    var modPlus,modMinus;
    return arr.map(function(color, index){
      modPlus = Math.floor(Math.random() * 255 - color)
      modMinus = Math.floor(Math.random() * color)
      return color % 2 == 0 ? color + modPlus : color - modMinus;
    })
  })

}

exports.littleLessRandom = function(array){
  return [].map.call(array, function(arr){
    var modPlus,modMinus;
    return arr.map(function(color, index){
      modPlus = Math.floor((Math.random() * 255 - color)/2)
      modMinus = Math.floor((Math.random() * color)/2)
      return color % 2 == 0 ? color + modPlus : color - modMinus;
    })
  })

}

exports.rainbow = function(array) {
  return [].map.call(array, function(arr){
    return arr.map(function(color, i){
      return i == 0 ? color : 255 - color;
    })
  })
}

exports.whatEven = function(array) {
  var rand;
  return [].map.call(array, function(arr){
    return arr.map(function(color, i){
      rand = Math.floor(Math.random() * 3)
      return i == rand ? color : 255 - color;
    })
  })
}