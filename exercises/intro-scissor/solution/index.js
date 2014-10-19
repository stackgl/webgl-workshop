exports.draw = function(gl) {
  var w = gl.drawingBufferWidth
  var h = gl.drawingBufferHeight
  var w_2 = (w/2)|0
  var h_2 = (h/2)|0

  gl.enable(gl.SCISSOR_TEST)

  gl.scissor(0,0,w_2,h_2)
  gl.clearColor(0,0,1,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.scissor(w-w_2,0,w_2,h_2)
  gl.clearColor(1,1,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.scissor(0,h-h_2,w_2,h_2)
  gl.clearColor(1,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.scissor(w-w_2,h-h_2,w_2,h_2)
  gl.clearColor(0,1,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.disable(gl.SCISSOR_TEST)
}
