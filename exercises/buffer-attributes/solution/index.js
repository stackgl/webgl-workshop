var setupShader = require('./setup-shader')

var DATA        = require('./data.json')
var NUM_VERTS   = (DATA.length/2)|0

var program, uScreenSize

exports.init = function(gl) {
  program = setupShader(gl)
  uScreenSize = gl.getUniformLocation(program, 'uScreenSize')

  var buffer = gl.createBuffer(gl.ARRAY_BUFFER)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(DATA), gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
}

exports.draw = function(gl) {
  var width  = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  gl.viewport(0, 0, width, height)
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)
  gl.uniform2f(uScreenSize, width, height)
  gl.drawArrays(gl.TRIANGLES, 0, NUM_VERTS)
}
