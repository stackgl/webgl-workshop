var VERT_SRC = "\
attribute vec2 uv;\
attribute vec3 color;\
\
varying vec3 fcolor;\
\
void main() {\
  fcolor = color;\
  gl_Position = vec4(uv, 0, 1);\
  gl_PointSize = 5.0;\
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

  gl.bindAttribLocation(program, 0, 'uv')
  gl.bindAttribLocation(program, 1, 'color')

  gl.linkProgram(program)

  gl.useProgram(program)


  var vertices = []
  function nGon(color, sides, theta0, step) {
    for(var i=0; i<sides; ++i) {
      var theta = i * step + theta0
      var x = Math.cos(theta)
      var y = Math.sin(theta)
      vertices.push(x,y,color[0],color[1],color[2])
    }
  }

  nGon([0,1,0], 3, Math.PI/2.0, 2.0*Math.PI/3)
  nGon([1,0,0], 32, 0.0, Math.PI/16)
  nGon([0,0,1], 32, 0.0, 7.0*Math.PI/16)
  nGon([0,0,1], 32, 7.0*Math.PI/16, 7.0*Math.PI/16)
  nGon([1,1,0], 32, 0.0, Math.PI/16)
  nGon([1,0,1], 5, Math.PI/4.0, 2.0*Math.PI/5)

  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 20, 0)

  gl.enableVertexAttribArray(1)
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 20, 8)
}