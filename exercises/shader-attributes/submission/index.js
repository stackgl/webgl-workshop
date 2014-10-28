//These are provided for you, do not change them
var setupShader  = require('./setup-shader')
var drawTriangle = require('./draw-triangle')

var program

exports.init = function(gl) {
  program = setupShader(gl)

  //TODO: Set up attribute locations here
}

exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  drawTriangle(gl)
}