var setup         = require('./setup')
var ELEMENT_DATA  = require('./data.json').elements
var ELEMENT_COUNT = ELEMENT_DATA.length

var setAngle

var elements

exports.init = function(gl) {
  setAngle = setup(gl)

  elements = gl.createBuffer(gl.ELEMENT_ARRAY_BUFFER)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elements)
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(ELEMENT_DATA),
    gl.STATIC_DRAW)
}

exports.draw = function(gl, t) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(1,1,1,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  setAngle(0.003 * t)

  gl.drawElements(
    gl.TRIANGLES,
    ELEMENT_COUNT,
    gl.UNSIGNED_SHORT,
    0)
}
