var VERT_SRC = "\
attribute vec2 uv;\
\
void main() {\
  gl_Position = vec4(uv.x, -uv.y, 0, 1);\
}"

var FRAG_SRC = "\
precision mediump float;\
\
void main() {\
  gl_FragColor = vec4(1,1,1,1);\
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