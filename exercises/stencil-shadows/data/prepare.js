var bunny = require('bunny') //require('conway-hart')('I')
var sc = require('simplicial-complex')
var faceNormals = require('normals').faceNormals

var positions = bunny.positions
var triangles = sc.normalize(bunny.cells)
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

var s = 0.5 / Math.max(hi[0]-lo[0],hi[1]-lo[1],hi[2]-lo[2])
var o = [0.5*(lo[0]+hi[0]), 0.5*(lo[1]+hi[1]), 0.5*(lo[2]+hi[2])]

var npositions = positions.map(function(p) {
  return [s*(p[0]-o[0]),s*(p[1]-o[1]),s*(p[2]-o[2])]
})

var mesh = []
for(var i=0; i<triangles.length; ++i) {
  var t = triangles[i]
  var n = normals[i]
  for(var j=0; j<3; ++j) {
    var p = npositions[t[j]]
    mesh.push(p[0],p[1],p[2],n[0],n[1],n[2])
  }
}

var edges = sc.unique(sc.normalize(sc.skeleton(triangles, 1)))
var incidence = sc.incidence(edges, triangles)

var shadowVerts = []

function pushV(p,u,v) {
  shadowVerts.push(p[0],p[1],p[2],1,u[0],u[1],u[2],v[0],v[1],v[2])
}

function emitFace(p,q,u,v) {
  pushV(p,u,v)
  pushV(q,u,v)
  shadowVerts.push(0,0,0,0,u[0],u[1],u[2],v[0],v[1],v[2])
}

for(var i=0; i<edges.length; ++i) {
  var e = edges[i]
  var flap = incidence[i]
  var n0 = normals[flap[0]]
  var n1 = normals[flap[1]]
  var p0 = npositions[e[0]]
  var p1 = npositions[e[1]]

  //Check orientation within flap
  var f0 = triangles[flap[0]]
  var vv = f0.indexOf(e[0])
  if(f0[(vv+1)%3] === e[1]) {
    var tmp = n0
    n0 = n1
    n1 = tmp
  }

  emitFace(p0,p1,n0,n1)
  emitFace(p1,p0,n1,n0)
}

var result = {
  MESH: mesh,
  SHADOW: shadowVerts
}

console.log(JSON.stringify(result))