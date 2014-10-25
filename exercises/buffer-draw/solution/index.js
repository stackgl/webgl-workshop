var setup = require('./setup')

exports.init = function(gl) {
  setup(gl)
}

exports.draw = function(gl) {
  gl.clearColor(1,1,1,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.drawArrays(gl.LINE_LOOP, 99, 32)
  gl.drawArrays(gl.TRIANGLE_FAN, 131, 5)
  gl.drawArrays(gl.LINES, 35, 64)
  gl.drawArrays(gl.POINTS, 3, 32)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}
