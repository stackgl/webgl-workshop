var DATA = require('./data.json')

var VERTICES = DATA.VERTICES
var ELEMENTS = DATA.ELEMENTS
var PIXELS   = DATA.PIXELS
var WIDTH    = DATA.WIDTH
var HEIGHT   = DATA.HEIGHT

function cameraMatrix(t) {
  var a = Math.cos(0.001 * t)
  var b = Math.sin(0.000237 * t)
  var c = Math.cos(0.00057 * t + 3)
  var d = Math.cos(0.0008 * t + 1.3)
  var s = 0.25 / (a*a+b*b+c*c+d*d)
  return [
    s*(a*a+b*b-c*c-d*d), 2*s*(b*c+a*d), 2*s*(b*d-a*c), 0,
    2*s*(b*c-a*d), s*(a*a+c*c-b*b-d*d), 2*s*(c*d+a*b), 0,
    2*s*(b*d+a*c), 2*s*(c*d-a*b), s*(a*a+d*d-b*b-c*c), 0,
     0,  0,  0.5, 1 ]
}

var VERT_SRC = "\
attribute vec3 position;\
attribute vec2 uv;\
uniform mat4 camera;\
varying vec2 fuv;\
void main() {\
  fuv = uv;\
  gl_Position = camera * vec4(position,1);\
}"

var FRAG_SRC = "\
precision mediump float;\
uniform sampler2D texture;\
varying vec2 fuv;\
void main() {\
  gl_FragColor = texture2D(texture, fuv);\
}"

var program,
    uCamera,
    uTexture,
    vbuffer,
    ebuffer,
    texture

function compileShader(gl, type, src) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  return shader
}

exports.init = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.enable(gl.DEPTH_TEST)

  var frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
  var vert = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)
  program = gl.createProgram()
  gl.attachShader(program, frag)
  gl.attachShader(program, vert)
  gl.bindAttribLocation(program, 0, 'position')
  gl.bindAttribLocation(program, 1, 'uv')
  gl.linkProgram(program)

  uCamera = gl.getUniformLocation(program, 'camera')
  uTexture = gl.getUniformLocation(program, 'texture')

  buffer = gl.createBuffer(gl.ARRAY_BUFFER)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(VERTICES),
    gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 20, 0)
  gl.enableVertexAttribArray(1)
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 20, 12)

  ebuffer = gl.createBuffer(gl.ELEMENT_ARRAY_BUFFER)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(ELEMENTS),
    gl.STATIC_DRAW)

  gl.activeTexture(gl.TEXTURE0)
  texture = gl.createTexture(gl.TEXTURE_2D)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    WIDTH,
    HEIGHT,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array(PIXELS))
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.generateMipmap(gl.TEXTURE_2D)
}

exports.draw = function(gl, t) {
  gl.clearColor(1,1,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)

  var camera = cameraMatrix(t)

  gl.useProgram(program)
  gl.uniform1i(uTexture, 0)
  gl.uniformMatrix4fv(uCamera, false, camera)

  gl.drawElements(gl.TRIANGLES, ELEMENTS.length, gl.UNSIGNED_SHORT, 0)
}
