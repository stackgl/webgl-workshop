var createBunny = require('./draw-bunny')
var drawBunny

exports.init = function(gl) {
  drawBunny = createBunny(gl)
}

// Draws a bunny that fill the screen.
// Change this function to draw two bunnies:
// one with a viewport taking up the left
// half of the screen and the other taking up
// the right half of the screen.
exports.draw = function(gl, t) {
  var width  = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  // Draws a bunny that fills the entire screen.
  gl.viewport(0, 0, width, height)
  drawBunny(gl, t)
}
