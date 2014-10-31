var createBunny = require('./draw-bunny')
var drawBunny

exports.init = function(gl, t) {
  drawBunny = createBunny(gl)
}

exports.draw = function(gl, t) {
  drawBunny(gl, t)
}
