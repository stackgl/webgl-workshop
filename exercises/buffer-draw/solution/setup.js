var VERT_SRC = "\
attribute vec2 uv;\
attribute vec3 color;\
uniform vec2 uScreenSize;\
\
varying vec3 fcolor;\
\
void main() {\
  fcolor = color;\
  gl_Position = vec4(uv * vec2(uScreenSize.y / uScreenSize.x, 1) * 0.75, 0, 1);\
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

  var green  = [0x61/0xFF, 0xFF/0xFF, 0x90/0xFF]
  var yellow = [0xFF/0xFF, 0xE1/0xFF, 0x69/0xFF]
  var blue   = [0x66/0xFF, 0xC4/0xFF, 0xFF/0xFF]
  var red    = [0xFF/0xFF, 0x6F/0xFF, 0x5C/0xFF]
  var grey   = [0xA9/0xFF, 0xB0/0xFF, 0xC2/0xFF]

  nGon(yellow, 3, Math.PI/2.0, 2.0*Math.PI/3)
  nGon(red, 32, 0.0, Math.PI/16)
  nGon(blue, 32, 0.0, 7.0*Math.PI/16)
  nGon(blue, 32, 7.0*Math.PI/16, 7.0*Math.PI/16)
  nGon(grey, 32, 0.0, Math.PI/16)
  nGon(green, 5, Math.PI/4.0, 2.0*Math.PI/5)

  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 20, 0)

  gl.enableVertexAttribArray(1)
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 20, 8)
  gl.lineWidth(1.5)

  return program
}
