var teapot = require('teapot')
var vertexNormals = require('normals').vertexNormals

var normals = vertexNormals(teapot.cells, teapot.positions)

//Find bounding box
var lo = [Infinity,Infinity,Infinity]
var hi = [-Infinity,-Infinity,-Infinity]

for(var i=0; i<teapot.positions.length; ++i) {
  var p = teapot.positions[i]
  for(var j=0; j<3; ++j) {
    lo[j] = Math.min(lo[j], p[j])
    hi[j] = Math.max(hi[j], p[j])
  }
}

var s = 1.0
var c = [0,0,0]
for(var i=0; i<3; ++i) {
  s = Math.max(s, hi[i]-lo[i])
  c[i] = -0.5*(hi[i]+lo[i])
}
s = 1.0 / s


var verts = []
for(var i=0; i<teapot.positions.length; ++i) {
  var p = teapot.positions[i]
  var n = normals[i]
  verts.push(
    s*(p[0]+c[0]),
    s*(p[1]+c[1]),
    s*(p[2]+c[2]),
    0.5*(1.0+n[0]),
    0.5*(1.0+n[1]),
    0.5*(1.0+n[2]))
}

var elems = []
for(var i=0; i<teapot.cells.length; ++i) {
  var c = teapot.cells[i]
  for(var j=0; j<3; ++j) {
    elems.push(c[j])
  }
}

var result = {
  elements: elems,
  vertices: verts
}

console.log(JSON.stringify(result))