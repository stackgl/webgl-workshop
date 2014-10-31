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

  var uImage = gl.getUniformLocation(program, 'image')
  gl.uniform1i(uImage, 0)

  var uScale = gl.getUniformLocation(program, 'scale')
  gl.uniform2f(uScale, 0, 0)

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

  gl.activeTexture(gl.TEXTURE0)

  return function(t) {
    gl.uniform2f(uScale,
      5*(Math.cos(0.001*t)+1.1),
      2.5*(Math.sin(0.007*t+0.1455)+1.05))
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
}
