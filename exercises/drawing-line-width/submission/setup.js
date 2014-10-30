var VERT_SRC = "\
precision mediump float;\
attribute float xoffset;\
uniform float yoffset;\
void main() {\
  gl_Position = vec4(xoffset, yoffset, 0, 1);\
}"

var FRAG_SRC = "\
precision mediump float;\
uniform vec3 color;\
void main() {\
  gl_FragColor = vec4(color,1);\
}"

function compileShader(gl, type, src) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  return shader
}

module.exports = function setup(gl) {
  var fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
  var vertShader = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)

  var program = gl.createProgram()
  gl.attachShader(program, fragShader)
  gl.attachShader(program, vertShader)
  gl.bindAttribLocation(program, 0, 'xoffset')
  gl.linkProgram(program)

  gl.useProgram(program)

  var uY = gl.getUniformLocation(program, 'yoffset')
  var uColor = gl.getUniformLocation(program, 'color')

  var vertices = [-1,1]

  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0)

  return function(y, color) {
    console.log(y,color)
    gl.useProgram(program)
    gl.uniform1f(uY, y)
    gl.uniform3fv(uColor, color)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.drawArrays(gl.LINES, 0, 2)
  }
}