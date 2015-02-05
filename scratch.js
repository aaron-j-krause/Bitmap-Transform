var fs = require('fs');
var thing = [];
var text = fs.createReadStream('dog.bmp');
var header, pixelData = [], bufferArray =[];
/*text.on('readable', function(){
  var what = text.read(8);
  console.log(what.length);
  text.read(0);
  //thing.push(text.read(8));
})
text.on('data', function(data){
  console.log(data.length);
})
text.on('end', function(){
  console.log(thing)
  /*thing.forEach(function(byte){
    console.log(byte);
  })
})
*/

function transformInverse(array){
  return [].map.call(array, function(arr){
    return arr.map(function(color){
      return 255 - color;
    })
  })
}

function transformRandom(array){
  return [].map.call(array, function(arr){
    var modPlus,modMinus;
    return arr.map(function(color, index){
      modPlus = Math.floor(Math.random() * 255 - color)
      modMinus = Math.floor(Math.random() * color)
      return color % 2 == 0 ? color + modPlus : color - modMinus;
    })
  })

}

function transformLittleLessRandom(array){
  return [].map.call(array, function(arr){
    var modPlus,modMinus;
    return arr.map(function(color, index){
      modPlus = Math.floor((Math.random() * 255 - color)/2)
      modMinus = Math.floor((Math.random() * color)/2)
      return color % 2 == 0 ? color + modPlus : color - modMinus;
    })
  })

}

text.on('readable', function () {
  while (null !== (chunk = text.read())) {
    pixelData.push(chunk);
  }
});


text.on('end', function () {
  var origBuffer = Buffer.concat(pixelData);
  var dta = pixelData.map(function(arr){
    return arr.toJSON();
  });
  console.log('before reduce', dta.length)
  dta = dta.reduce(function(a,b){
    return a.concat(b);
  })
  console.log('full array', dta.length);
  var header = dta.splice(0,54);
  console.log('dta length',dta.length)
  var rgbArray = [];
  var bufferArray = [];

  
  var group = [], counter = 1;
  for (var i = 0; i < dta.length; i++) {
    group.push(dta[i]);
    counter++;
    if(counter % 5 == 0){
      rgbArray.push(group);
      counter = 1;
      group = [];
    }
  };

  rgbArray = transformLittleLessRandom(rgbArray);

  //console.log('color array(10) and length', rgbArray);
  bufferArray.push(new Buffer(header));
  for (var i = 0; i < rgbArray.length; i++) {
    bufferArray.push(new Buffer(rgbArray[i]))
  };
  bufferArray = Buffer.concat(bufferArray);
  console.log('buffer array length', bufferArray.length);
  console.log('buffer array is a buffer', Buffer.isBuffer(bufferArray),'original is a buffer',Buffer.isBuffer(origBuffer))
  //console.log('original array (10) and length', pixelData.slice(0,10).length);
  //console.log('pix, rgb, buf', pixelData.length, rgbArray.length, bufferArray.length)
  //console.log(pixelData[0].toJSON() == bufferArray[0].toJSON())
  //var testOrig = origBuffer.toJSON()
  //var testNew = bufferArray.toJSON()
  var rand;
  for(i = 0; i < 20; i++){
    rand = Math.floor(Math.random() * bufferArray.length)
    console.log(bufferArray[rand])
    console.log(rand, bufferArray[rand] == origBuffer[rand]);
  }
  fs.writeFileSync('./newDog.bmp',bufferArray)

});