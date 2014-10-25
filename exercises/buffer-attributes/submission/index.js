var setupShader = require('./setup-shader')

var DATA        = require('./data.json')
var NUM_VERTS   = (DATA.length/2)|0

var program

exports.init = function(gl) {
  program = setupShader(gl)

  var buffer = gl.createBuffer(gl.ARRAY_BUFFER)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(DATA), gl.STATIC_DRAW)

  //TODO: Set up vertex attribute pointers here
}

exports.draw = function(gl) {
  gl.clearColor(1,1,1,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)

  gl.drawArrays(gl.LINES, 0, NUM_VERTS)
}
