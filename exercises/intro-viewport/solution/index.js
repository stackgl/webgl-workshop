var drawBunny = require('./draw-bunny')

exports.draw = function(gl) {
  var width  = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  // Draws the bunny on the left.
  gl.viewport(0, 0, width/2, height)
  drawBunny(gl)

  // Draws the bunny on the right.
  gl.viewport(width/2, 0, width/2, height)
  drawBunny(gl)
}
