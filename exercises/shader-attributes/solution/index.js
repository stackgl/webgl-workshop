var setupShader  = require('./setup-shader')
var drawTriangle = require('./draw-triangle')

var program

exports.init = function(gl) {
  program = setupShader(gl)

  gl.bindAttribLocation(program, 0, 'position')
  gl.bindAttribLocation(program, 1, 'color')
  gl.linkProgram(program)
}

exports.draw = function(gl) {
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  drawTriangle(gl)
}
