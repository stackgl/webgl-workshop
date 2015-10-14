var setup = require('./setup')
var drawRect

exports.init = function(gl) {
  drawRect = setup(gl)
}

exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  drawRect([-1,-1], [-0.5,1], [1, 0, 0, 1])
  drawRect([-1,-1], [1,-0.5], [0, 0, 1, 1])
  drawRect([0.5,-1], [1,1], [0, 1, 0, 1])
  drawRect([-1,0.5], [1,1], [1, 1, 1, 0.5])
}
