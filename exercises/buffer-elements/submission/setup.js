var DATA = require('./data.json')

var VERT_SRC = "\
attribute vec3 position;\
attribute vec3 color;\
\
uniform float t;\
\
varying vec3 fcolor;\
\
void main() {\
  fcolor = color;\
  float c = cos(t), s = sin(t);\
  gl_Position = vec4(\
    c*position.x + s*position.z,\
    position.y,\
    c*position.z - s*position.x+0.5,\
    1);\
}"

var FRAG_SRC = "\
precision mediump float;\
\
varying vec3 fcolor;\
\
void main() {\
  gl_FragColor = vec4(fcolor,1);\
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

  gl.bindAttribLocation(program, 0, 'position')
  gl.bindAttribLocation(program, 1, 'color')

  gl.linkProgram(program)

  gl.useProgram(program)

  var uTime = gl.getUniformLocation(program, 't')
  gl.uniform1f(uTime, 0.3)

  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, 
    new Float32Array(DATA.vertices), 
    gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0)
  gl.enableVertexAttribArray(1)
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12)

  gl.enable(gl.DEPTH_TEST)

  return function(t) {
    gl.uniform1f(uTime, t % (2.0*Math.PI))
  }
}