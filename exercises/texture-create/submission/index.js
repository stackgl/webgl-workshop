var setup  = require('./setup')

//Image data
var PIXELS = new Uint8Array(require('./data.json'))
var WIDTH  = 512
var HEIGHT = 512

//PIXELS is a flat length 512x512x4 array of RGBA values
//in the range 0-255

var drawIt

exports.init = function(gl) {
  drawIt = setup(gl)

  //TODO: Create a 2D texture and bind it. The content
  //of the texture should come from the PIXELS array
  //defined above.
  //
  //The texture must not use any filtering (gl.NEAREST)
}

exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  drawIt()
}
