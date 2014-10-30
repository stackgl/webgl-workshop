var setupShader = require('./setup-shader')
var drawIt = require('./draw-it')

var DATA = require('./vertices.json')

var program, buffer, uScreenSize

exports.init = function(gl) {
  program = setupShader(gl)
  uScreenSize = gl.getUniformLocation(program, 'uScreenSize')

  buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(DATA), gl.STATIC_DRAW)
}

exports.draw = function(gl) {
  var width = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  gl.viewport(0, 0, width, height)
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  gl.uniform2f(uScreenSize, width, height)

  drawIt(gl, buffer)
}
