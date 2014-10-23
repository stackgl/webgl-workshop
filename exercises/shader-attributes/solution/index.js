var setupShader  = require('./setup-shader')
var drawTriangle = require('./draw-triangle')

var program

exports.init = function(gl) {
  program = setupShader(gl)

  gl.bindAttribLocation(program, 'position', 0)
  gl.bindAttribLocation(program, 'color', 1)
}

exports.draw = function(gl) {
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  drawTriangle(gl)
}