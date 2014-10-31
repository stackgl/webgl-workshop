var setup         = require('./setup')
var drawIt

exports.init = function(gl) {
  drawIt = setup(gl)
  gl.enable(gl.DEPTH_TEST)
}

exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(1,1,1,1)
  gl.clearDepth(0.65)
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
  drawIt()
}
