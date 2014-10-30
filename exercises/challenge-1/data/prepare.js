'use strict'

var img = require('baboon-image')

var cubeVerts = []
var cubeFaces = []

for(var d=0; d<3; ++d) {
  for(var s=-1; s<2; s+=2) {
    var u = (d+1) % 3
    var v = (d+2) % 3
    var ptr = (cubeVerts.length)/5
    for(var i=0; i<2; ++i) {
      for(var j=0; j<2; ++j) {
        var x = [0,0,0]
        x[d] = s
        x[v] = i ? s : -s
        x[u] = j ? s : -s
        cubeVerts.push(x[0], x[1], x[2], i, j)
      }
    }
    cubeFaces.push(ptr, ptr+1, ptr+2,
                   ptr+2, ptr+1, ptr+3)
  }
}

var mesh = {
  VERTICES: cubeVerts,
  ELEMENTS: cubeFaces,
  PIXELS:   [].slice.call(img.data),
  WIDTH:    512,
  HEIGHT:   512
}

console.log(JSON.stringify(mesh))