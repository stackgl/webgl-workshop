var setup         = require('../submission/setup')
var drawIt

exports.init = function(gl) {
  drawIt = setup(gl)
  gl.frontFace(gl.CW)
}

exports.draw = function(gl) {
  drawIt(Date.now())
}
