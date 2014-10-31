'use strict'

var triangulatePolyline = require('triangulate-polyline')

var australia = require('./australia.json')
var vertices = []

function processLoops(loops) {
  var verts = []
  var index = []
  for(var i=0; i<loops.length; ++i) {
    var loop = loops[i]
    var cur = []
    for(var j=0; j<loop.length; ++j) {
      cur.push(verts.length)
      verts.push(loop[j])
    }
    index.push(cur)
  }

  var tris = triangulatePolyline(index, verts)
  for(var i=0; i<tris.length; ++i) {
    var t = tris[i]
    for(var j=0; j<3; ++j) {
      var p = verts[t[j]]
      vertices.push(p)
    }
  }
}

australia.features.map(function(feature) {
  return feature.geometry
}).forEach(function(geom) {
  if(geom.type === 'MultiPolygon') {
    geom.coordinates.forEach(processLoops)
  } else if(geom.type === 'Polygon') {
    processLoops(geom.coordinates)
  } else {
    return []
  }
})

var lo = [ Infinity, Infinity]
var hi = [-Infinity,-Infinity]
vertices.forEach(function(v) {
  for(var i=0; i<2; ++i) {
    lo[i] = Math.min(lo[i], v[i])
    hi[i] = Math.max(hi[i], v[i])
  }
})

var s = 1.0 / Math.max(hi[0] - lo[0], hi[1] - lo[1])
var o = [0.5 * (hi[0]+lo[0]), 0.5 * (hi[1]+lo[1])]

var verts = []
vertices.forEach(function(a) {
  verts.push(s*(a[0]-o[0]), s*(a[1]-o[1]))
})

//console.log(regions[3])
//console.log(loops)
console.log(JSON.stringify(verts))