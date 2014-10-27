var VERT_SRC = "\
precision mediump float;\
\
attribute vec2 position;\
\
varying vec2 uv;\
\
void main() {\
  uv = 0.5 * vec2(1.0+position.x, 1.0-position.y);\
  gl_Position = vec4(position, 0, 1);\
}"

var FRAG_SRC = "\
precision mediump float;\
\
uniform sampler2D bg1, bg2;\
uniform float scroll;\
\
varying vec2 uv;\
\
void main() {\
  vec4 a = texture2D(bg1, vec2(uv.x + scroll, uv.y));\
  vec4 b = texture2D(bg2, uv);\
  gl_FragColor = a*(1.0-b.a) + b;\
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