'use strict'

var fs = require('fs')
var getPixels = require('get-pixels')

getPixels('./exterior-parallaxBG1.png', function(err,bg1) {
  getPixels('./exterior-parallaxBG2.png', function(err,bg2) {
    done(
      bg1.lo(0,44),
      bg2.lo(72,44).hi(256,256))
  })
})

function ndToJSON(arr) {
  var packed = new Array(256*256*4)
  var ptr = 0
  for(var j=0; j<256; ++j) {
    for(var i=0; i<256; ++i) {
      var r = arr.get(i,j,0)
      var g = arr.get(i,j,1)
      var b = arr.get(i,j,2)
      var a = arr.get(i,j,3)

      if(r === 111 && 
         g === 109 &&
         b === 81  &&
         a === 255) {
        r = g = b = a = 0
      }

      packed[ptr++] = r
      packed[ptr++] = g
      packed[ptr++] = b
      packed[ptr++] = a
    }
  }

  return packed
}

function done(bg1, bg2) {
  var result = {
    BG1:    ndToJSON(bg1),
    BG2:    ndToJSON(bg2)
  }
  console.log(JSON.stringify(result))
}