var setup         = require('./setup')
var draw

exports.init = function(gl) {
  draw = setup(gl)
}

exports.draw = function(gl, t) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(1,1,1,1)
  gl.clearDepth(1)
  gl.clear(
    gl.COLOR_BUFFER_BIT |
    gl.DEPTH_BUFFER_BIT |
    gl.STENCIL_BUFFER_BIT)

  gl.enable(gl.DEPTH_TEST)

  //Draw mesh with full light intensity
  gl.depthFunc(gl.LEQUAL)
  draw.mesh(t, 1.0)

  //Draw shadow volume
  gl.depthFunc(gl.LESS)
  draw.shadow(t)
}
