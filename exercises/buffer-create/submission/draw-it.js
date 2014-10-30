var DATA_SIZE = require('./vertices.json').length

module.exports = function drawIt(gl, buffer) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
  gl.lineWidth(2)
  gl.drawArrays(gl.LINES, 0, (DATA_SIZE/2)|0)
}
