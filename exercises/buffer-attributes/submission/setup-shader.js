var VERT_SRC = "\
attribute vec2 position;\
uniform vec2 uScreenSize;\
\
void main() {\
  vec2 pos = position * 1.5;\
  pos.x *= uScreenSize.y / uScreenSize.x;\
  gl_Position = vec4(pos, 0, 1);\
}"

var FRAG_SRC = "\
precision mediump float;\
\
void main() {\
  gl_FragColor = vec4(0, 0, 1, 1);\
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
