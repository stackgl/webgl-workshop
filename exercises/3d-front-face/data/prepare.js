var fs = require('fs')
var parseObj = require('parse-obj')
var faceNormals = require('normals').faceNormals

parseObj(fs.createReadStream('./brain.obj'),
  function(err, result) {
    var positions = result.vertexPositions
    var triangles = result.facePositions
    var normals   = faceNormals(triangles, positions)

    var lo = [Infinity,Infinity,Infinity]
    var hi = [-Infinity,-Infinity,-Infinity]

    for(var i=0; i<positions.length; ++i) {
      var p = positions[i]
      for(var j=0; j<3; ++j) {
        lo[j] = Math.min(lo[j], p[j])
        hi[j] = Math.max(hi[j], p[j])
      }
    }

    var s = 1.0 / Math.max(hi[0]-lo[0],hi[1]-lo[1],hi[2]-lo[2])
    var o = [0.5*(lo[0]+hi[0]), 0.5*(lo[1]+hi[1]), 0.5*(lo[2]+hi[2])]

    var result = []
    for(var i=0; i<triangles.length; ++i) {
      var t = triangles[i]
      var n = normals[i]
      for(var j=0; j<3; ++j) {
        var p = positions[t[j]]
        result.push(s*(p[0]-o[0]),s*(p[1]-o[1]),s*(p[2]-o[2]),n[0],n[1],n[2])
      }
    }
    console.log(JSON.stringify(result))
  })
