var setup       = require('./setup')

var DATA        = require('./data.json')
var VERTS       = DATA.verts
var NUM_VERTS   = DATA.numVerts

var setT

exports.init = function(gl) {
  setT = setup(gl)

  var buffer = gl.createBuffer(gl.ARRAY_BUFFER)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VERTS), gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 16, 0)

  gl.enableVertexAttribArray(1)
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 16, 8)
}

exports.draw = function(gl, t) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0.1,0.1,0.1,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  //t controls the amount of warp
  // 0 = bush
  // 1 = obama
  var t = 0.5 * (1.0 + Math.cos(0.001 * t))
  setT(t)

  //Draw the shader
  gl.drawArrays(gl.TRIANGLES, 0, NUM_VERTS)
}
