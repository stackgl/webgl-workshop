//Code for setting up shader program is provided for you
var setupShader  = require('./setup-shader')
var drawTriangle = require('./draw-triangle')

var scales  = [ 0.15, 0.25, 0.5, 0.3 ]
var offsets = [ [-0.5,-0.5], 
                [0.5,-0.5], 
                [0.1,0.3],
                [0.3,-0.4] ]
var colors  = [ [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1],
                [1, 1, 0] ]

var program
var uScale, uOffset, uColor

exports.init = function(gl) {
  program = setupShader(gl)

  uScale  = gl.getUniformLocation(program, 'scale')
  uOffset = gl.getUniformLocation(program, 'offset')
  uColor  = gl.getUniformLocation(program, 'color')
}

exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)

  for(var i=0; i<4; ++i) {
    gl.uniform1f(uScale, scales[i])
    gl.uniform2fv(uOffset, offsets[i])
    gl.uniform3fv(uColor, colors[i])
    drawTriangle(gl)
  }
}