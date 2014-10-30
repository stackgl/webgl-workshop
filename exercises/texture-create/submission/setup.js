var VERT_SRC = "\
precision mediump float;\
\
attribute vec2 position;\
uniform vec2 uScreenSize;\
\
varying vec2 uv;\
\
void main() {\
  vec2 pos = position * vec2(uScreenSize.x / uScreenSize.y, 1);\
  uv = 0.5 * vec2(pos.x + 1.0, 1.0 - pos.y);\
  gl_Position = vec4(position, 0, 1);\
}"

var FRAG_SRC = "\
precision mediump float;\
\
uniform sampler2D image;\
\
varying vec2 uv;\
\
void main() {\
  gl_FragColor = texture2D(image, uv);\
}"

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
  var uScreenSize = gl.getUniformLocation(program, 'uScreenSize')
  gl.uniform1i(uImage, 0)

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

  return function() {
    gl.uniform2f(uScreenSize, gl.drawingBufferWidth, gl.drawingBufferHeight)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
}
