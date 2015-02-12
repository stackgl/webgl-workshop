var setup = require('./setup')
var drawIt

exports.init = function(gl) {
  drawIt = setup(gl)
}

exports.draw = function(gl, t) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  drawIt(t)
}
