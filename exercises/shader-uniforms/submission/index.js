//Code for setting up shader program is provided for you
var setupShader  = require('./setup-shader')

//As before, this draws a triangle
var drawTriangle = require('./draw-triangle')

//These are the values at which you should draw the triangles
var scales  = [ 0.15, 0.25, 0.5, 0.3 ]
var offsets = [ [-0.5,-0.5], 
                [0.5,-0.5], 
                [0.1,0.3],
                [0.3,-0.4] ]
var colors  = [ [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1],
                [1, 1, 0] ]

//This is the program object
var program

exports.init = function(gl) {
  program = setupShader(gl)

  //TODO: Get uniform locations here
}

exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  //TODO: Draw the triangles with the shader/uniforms
}
