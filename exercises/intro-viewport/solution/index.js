var createBunny = require('./draw-bunny')
var drawBunny

exports.init = function(gl) {
  drawBunny = createBunny(gl)
}

exports.draw = function(gl, t) {
  var width  = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  // Draws the bunny on the left.
  gl.viewport(0, 0, width/2, height)
  drawBunny(gl, t)

  // Draws the bunny on the right.
  gl.viewport(width/2, 0, width/2, height)
  drawBunny(gl, t)
}
