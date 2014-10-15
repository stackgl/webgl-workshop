// Magenta is a full mix of red and blue,
// so we pass them in as 1 (the maxiumum value)
// while leaving green as 0. "alpha" should be 1 too
// or the image will be made transparent.

var red   = 1
var green = 0
var blue  = 1
var alpha = 1

exports.draw = function(gl) {
  gl.clearColor(red, green, blue, alpha)
  gl.clear(gl.COLOR_BUFFER_BIT)
}
