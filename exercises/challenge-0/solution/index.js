var FRAG_SRC = "\
precision mediump float;\
void main() {\
  gl_FragColor = vec4(0, 0, 1, 1);\
}"

//This is the source code for the vertex shader
var VERT_SRC = "\
attribute vec2 position;\
void main() {\
  gl_Position = vec4(position,0,1);\
}"

var program, buffer

function compileShader(gl, type, src) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  return shader
}

exports.init = function(gl) {
  var frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
  var vert = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)
  program = gl.createProgram()
  gl.attachShader(program, frag)
  gl.attachShader(program, vert)
  gl.bindAttribLocation(program, 0, 'position')
  gl.linkProgram(program)

  buffer = gl.createBuffer(gl.ARRAY_BUFFER)
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
       0, 1,
      -1, 0,
       1, 0
    ]), 
    gl.STATIC_DRAW)

  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
}

exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(1,1,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(program)

  gl.drawArrays(gl.TRIANGLES, 0, 3)
}