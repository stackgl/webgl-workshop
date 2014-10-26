var VERT_SRC = "\
precision mediump float;\
\
attribute vec2 position;\
\
varying vec2 uv;\
\
void main() {\
  uv = position;\
  gl_Position = vec4(position, 0, 1);\
}"

var FRAG_SRC = "\
precision mediump float;\
\
uniform sampler2D image;\
uniform vec2 shift;\
\
varying vec2 uv;\
\
void main() {\
  vec2 coord = vec2(uv.x/uv.y, 1.0/uv.y) - shift;\
  gl_FragColor = step(0.0, -uv.y) * texture2D(image, vec2(coord.x + coord.y, coord.x - coord.y));\
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
  gl.uniform1i(uImage, 0)

  var uShift = gl.getUniformLocation(program, 'shift')
  gl.uniform2f(uShift, 0, 0)

  var buffer = gl.createBuffer(gl.ARRAY_BUFFER)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      4, 4,
      0, -4,
      -4, 0
    ]), gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  gl.activeTexture(gl.TEXTURE0)

  return function(t) {
    gl.viewport(0,0,gl.drawingBufferWidth, gl.drawingBufferHeight)

    t = 0.001*t
    gl.uniform2f(uShift, 0, (t % 1.0))

    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
}