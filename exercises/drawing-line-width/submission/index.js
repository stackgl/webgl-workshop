var setup = require('./setup')

var drawLine

exports.init = function(gl) {
  drawLine = setup(gl)
}

exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  drawLine(-0.5, [1,0,0])

  drawLine(0,  [0,1,0])

  drawLine(0.5, [1,1,1])
}
