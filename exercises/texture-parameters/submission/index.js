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

  //TODO: Set up the following parameters for the texture:
  //
  // * Linear minifaction
  // * Linear magnification
  // * Repeating along the s-axis
  // * Mirroring along the t-axis
  //
}

exports.draw = function(gl, t) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  drawIt(t)
}
