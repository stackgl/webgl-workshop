var setup         = require('./setup')
var drawIt

exports.init = function(gl) {
  drawIt = setup(gl)
}

exports.draw = function(gl) {
  drawIt(Date.now())
}
