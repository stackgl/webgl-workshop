var setupShader = require('./setup-shader')
var drawIt = require('./draw-it')

var DATA = require('./vertices.json')

var program, buffer

exports.init = function(gl) {
  program = setupShader(gl)

  buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(DATA), gl.STATIC_DRAW)
}

exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)

  drawIt(gl, buffer)
}
