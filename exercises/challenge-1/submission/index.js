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

exports.init = function(gl) {
}

exports.draw = function(gl, t) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(1,1,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  var camera = cameraMatrix(t)

  //TODO: Draw a cube with the camera matrix supplied above
}
