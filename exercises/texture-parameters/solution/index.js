var setup  = require('./setup')
var PIXELS = require('./data.json')
var WIDTH  = 512
var HEIGHT = 512

var drawIt

exports.init = function(gl) {
  drawIt = setup(gl)

  var texture = gl.createTexture()

  gl.bindTexture(gl.TEXTURE_2D, texture)

  gl.texImage2D(gl.TEXTURE_2D,
    0,
    gl.RGBA,
    WIDTH,
    HEIGHT,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array(PIXELS))

  gl.texParameteri(gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.LINEAR)

  gl.texParameteri(gl.TEXTURE_2D,
    gl.TEXTURE_MAG_FILTER,
    gl.LINEAR)

  gl.texParameteri(gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_S,
    gl.REPEAT)

  gl.texParameteri(gl.TEXTURE_2D,
    gl.TEXTURE_WRAP_T,
    gl.MIRRORED_REPEAT)
}

exports.draw = function(gl, t) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  drawIt(t)
}
