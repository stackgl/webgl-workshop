var setup = require('./setup')

var program, uScreenSize

exports.init = function(gl) {
  program = setup(gl)
  uScreenSize = gl.getUniformLocation(program, 'uScreenSize')
}

exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  gl.uniform2f(uScreenSize, gl.drawingBufferWidth, gl.drawingBufferHeight)

  // TODO: draw the primitives using gl.drawArrays here.
}
