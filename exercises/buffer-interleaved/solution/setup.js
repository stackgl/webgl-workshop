var DATA = require('./data.json')

var VERT_SRC = "\
precision mediump float;\
attribute vec2 position0, position1;\
uniform vec2 uScreenSize;\
\
uniform float t;\
\
varying vec2 uv0, uv1;\
\
void main() {\
  uv0 = 0.5 * vec2(1.0+position0.x,1.0+position0.y);\
  uv1 = 0.5 * vec2(1.0+position1.x,1.0+position1.y);\
  vec2 position = mix(position0, position1, t) * 0.75;\
  position.x /= uScreenSize.x / uScreenSize.y;\
  gl_Position = vec4(position.x, -position.y, 0.0, 1.0);\
}"

var FRAG_SRC = "\
precision mediump float;\
\
uniform sampler2D src, dst;\
uniform float t;\
\
varying vec2 uv0,uv1;\
\
void main() {\
  gl_FragColor = mix(texture2D(src,uv0), texture2D(dst,uv1), t);\
}"

function compileShader(gl, type, src) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  console.log(gl.getShaderInfoLog(shader))
  return shader
}

function createTexture(gl, pixels) {
  var texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    256,
    256,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array(pixels))
  gl.generateMipmap(gl.TEXTURE_2D)
}

module.exports = function setupShader(gl) {
  var fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
  var vertShader = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)

  var program = gl.createProgram()
  gl.attachShader(program, fragShader)
  gl.attachShader(program, vertShader)

  gl.bindAttribLocation(program, 0, 'position0')
  gl.bindAttribLocation(program, 1, 'position1')

  gl.linkProgram(program)

  var uScreenSize = gl.getUniformLocation(program, 'uScreenSize')
  var uTime       = gl.getUniformLocation(program, 't')
  var uSrc        = gl.getUniformLocation(program, 'src')
  var uDst        = gl.getUniformLocation(program, 'dst')

  gl.useProgram(program)

  gl.activeTexture(gl.TEXTURE0)
  var srcTex = createTexture(gl, DATA.src)
  gl.uniform1i(uSrc, 0)

  gl.activeTexture(gl.TEXTURE0+1)
  var dstTex = createTexture(gl, DATA.dst)
  gl.uniform1i(uDst, 1)

  gl.uniform1f(uTime, 0.5)

  return function(t, width, height) {
    gl.uniform1f(uTime, t)
    gl.uniform2f(uScreenSize, gl.drawingBufferWidth, gl.drawingBufferHeight)
  }
}
