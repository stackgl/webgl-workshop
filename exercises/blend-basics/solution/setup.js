var VERT_SRC = "\
precision mediump float;\
attribute vec2 uvt;\
uniform vec2 uScreenSize, lo, hi;\
void main() {\
  vec2 uv = lo + uvt * (hi - lo);\
  gl_Position = vec4(uv * vec2(uScreenSize.y / uScreenSize.x, 1) * 0.75, 0, 1);\
}"

var FRAG_SRC = "\
precision mediump float;\
uniform vec4 color;\
void main() {\
  gl_FragColor = color;\
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
  gl.bindAttribLocation(program, 0, 'uvt')
  gl.linkProgram(program)

  gl.useProgram(program)

  var ulo = gl.getUniformLocation(program, 'lo')
  var uhi = gl.getUniformLocation(program, 'hi')
  var uScreenSize = gl.getUniformLocation(program, 'uScreenSize')
  var ucolor = gl.getUniformLocation(program, 'color')

  var vertices = [
    0,0,
    0,1,
    1,0,
    1,0,
    0,1,
    1,1
  ]

  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  return function(lo, hi, color) {
    gl.uniform2fv(ulo, lo)
    gl.uniform2fv(uhi, hi)
    gl.uniform2f(uScreenSize, gl.drawingBufferWidth, gl.drawingBufferHeight)
    gl.uniform4fv(ucolor, color)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
}
