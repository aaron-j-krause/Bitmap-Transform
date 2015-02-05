exports = module.exports = {};

exports.transformInverse = function(array) {
  return [].map.call(array, function(arr){
    return arr.map(function(color){
      return 255 - color;
    })
  })
}

exports.transformRandom = function(array){
  return [].map.call(array, function(arr){
    var modPlus,modMinus;
    return arr.map(function(color, index){
      modPlus = Math.floor(Math.random() * 255 - color)
      modMinus = Math.floor(Math.random() * color)
      return color % 2 == 0 ? color + modPlus : color - modMinus;
    })
  })

}

exports.transformLittleLessRandom = function(array){
  return [].map.call(array, function(arr){
    var modPlus,modMinus;
    return arr.map(function(color, index){
      modPlus = Math.floor((Math.random() * 255 - color)/2)
      modMinus = Math.floor((Math.random() * color)/2)
      return color % 2 == 0 ? color + modPlus : color - modMinus;
    })
  })

}