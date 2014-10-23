var VERT_SRC = "\
attribute vec2 uv;\
\
uniform vec2 offset;\
uniform float scale;\
\
void main() {\
  gl_Position = vec4(uv * scale + offset, 0, 1);\
}"

var FRAG_SRC = "\
precision mediump float;\
\
uniform vec3 color;\
\
void main() {\
  gl_FragColor = vec4(color, 1);\
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
  gl.linkProgram(program)

  return program
}