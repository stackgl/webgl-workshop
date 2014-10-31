var setup  = require('./setup')
var DATA   = require('./data.json')

var BG1         = new Uint8Array(DATA.BG1)
var BG2         = new Uint8Array(DATA.BG2)
var WIDTH       = 256
var HEIGHT      = 256

var drawIt

exports.init = function(gl) {
  drawIt = setup(gl)

  //TODO: Create 2 periodic 256x256 RGBA textures
  // BG1 should be bound on texture unit 0
  // BG2 should be bound on texture unit 1
}

exports.draw = function(gl, t) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  drawIt(t)
}
