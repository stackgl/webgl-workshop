var VERTICES = require('./data.json')

var VERT_SRC = "\
precision mediump float;\
attribute vec3 position;\
attribute vec3 normal;\
\
uniform float t;\
\
varying vec3 light;\
varying vec3 coord;\
\
void main() {\
  light = normal;\
  float c = cos(t);\
  float s = sin(t);\
  coord = position;\
  vec3 lcoord = vec3(\
    c*position.x-s*position.z,\
    position.y,\
    c*position.z+s*position.x+0.5);\
  gl_Position = vec4(lcoord,1);\
}"

var FRAG_SRC = "\
precision mediump float;\
\
varying vec3 light;\
varying vec3 coord;\
\
void main() {\
  float x = max(light.x,0.0);\
  float y = max(-light.x,0.0);\
  if(gl_FrontFacing) {\
    gl_FragColor = vec4(0.6+x+max(-light.y,0.0),x,-2.0*coord.z+x,1);\
  } else {\
    gl_FragColor = vec4(y+max(light.y,0.0),0.6+y+0.2*max(light.y,0.0),-2.0*coord.z+y,1);\
  }\
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
  gl.bindAttribLocation(program, 1, 'normal')

  gl.linkProgram(program)

  gl.useProgram(program)

  var uTime = gl.getUniformLocation(program, 't')
  gl.uniform1f(uTime, 0.3)

  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, 
    new Float32Array(VERTICES), 
    gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0)
  gl.enableVertexAttribArray(1)
  gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12)

  gl.enable(gl.DEPTH_TEST)

  gl.frontFace(gl.CW)

  return function(t) {
    gl.clearColor(1,1,1,1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.uniform1f(uTime, (0.001*t) % (2.0*Math.PI))
    gl.drawArrays(gl.TRIANGLES, 0, VERTICES.length/6)
  }
}