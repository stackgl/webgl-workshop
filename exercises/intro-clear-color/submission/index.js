// Run once at the beginning: use this to create
// and setup things to be used in your draw function.
exports.init = function(gl) {

}

// Run every frame: use this to draw things to the screen.
exports.draw = function(gl) {
  gl.clearColor(1, 0, 0, 1) //Set clear color red, fully opaque
  gl.clear(gl.COLOR_BUFFER_BIT)
}
