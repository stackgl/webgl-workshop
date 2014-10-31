var fs = require('fs')

var VERT_SRC = fs.readFileSync(__dirname + '/shader.vert', 'utf8')
var FRAG_SRC = fs.readFileSync(__dirname + '/shader.frag', 'utf8')

function compileShader(gl, type, src) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  return shader
}

module.exports = function setupShader(gl) {
  var fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
  var vertShader = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)

  var program = gl.createProgram()

  gl.attachShader(program, fragShader)
  gl.attachShader(program, vertShader)
  gl.bindAttribLocation(program, 0, 'position')
  gl.linkProgram(program)

  gl.useProgram(program)

  gl.uniform1i(gl.getUniformLocation(program, 'bg1'), 0)
  gl.uniform1i(gl.getUniformLocation(program, 'bg2'), 1)

  var uScroll = gl.getUniformLocation(program, 'scroll')
  gl.uniform1f(uScroll, 0)

  var buffer = gl.createBuffer(gl.ARRAY_BUFFER)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      4, 4,
      0, -4,
      -4, 0
    ]), gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  gl.viewport(0,0,gl.drawingBufferWidth, gl.drawingBufferHeight)

  return function(t) {
    gl.uniform1f(uScroll, (0.0001*t)%1.0)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
}
