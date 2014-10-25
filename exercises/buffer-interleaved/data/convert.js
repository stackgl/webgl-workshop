var bush = require('./bush')
var obama = require('./obama')
var warp = require('./warp')

var verts = []



for(var i=0; i<warp.triangles.length; ++i) {
  var t = warp.triangles[i]
  for(var j=0; j<3; ++j) {
    var s = warp.srcPoints[t[j]]
    var d = warp.dstPoints[t[j]]
    verts.push(s[0], s[1], d[0], d[1])
  }
}

var data = {
  verts: verts,
  numVerts: (verts.length/4)|0,
  src: [].slice.call(bush),
  dst: [].slice.call(obama)
}

console.log(JSON.stringify(data))