var setup         = require('../submission/setup')
var drawIt

exports.init = function(gl) {
  drawIt = setup(gl)
  gl.frontFace(gl.CW)
}

exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  drawIt(Date.now())
}
