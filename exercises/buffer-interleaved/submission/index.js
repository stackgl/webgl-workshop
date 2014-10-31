var setup       = require('./setup')

var DATA        = require('./data.json')
var VERTS       = DATA.verts
var NUM_VERTS   = DATA.numVerts

var setMorphT

exports.init = function(gl) {
  setMorphT = setup(gl)

  var buffer = gl.createBuffer(gl.ARRAY_BUFFER)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VERTS),
    gl.STATIC_DRAW)

  //TODO: Set up vertex attribute pointers
}

exports.draw = function(gl, t) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0.1,0.1,0.1,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  //t controls the amount of warp
  // 0 = bush
  // 1 = obama
  var t = 0.5 * (1.0 + Math.cos(0.001 * t))
  setMorphT(t)

  gl.drawArrays(gl.TRIANGLES, 0, NUM_VERTS)
}
