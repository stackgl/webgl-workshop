//This is a helper function to make it easier to get started.
//You should call this function once your shader is set up
var drawTriangle = require('./draw-triangle')

//This is the source code for the fragment shader
var FRAG_SRC = "\
precision mediump float;\
void main() {\
  gl_FragColor = vec4(1, 0, 0, 1);\
}"

//This is the source code for the vertex shader
var VERT_SRC = "\
attribute vec2 position;\
void main() {\
  gl_Position = vec4(position,0,1);\
}"

//TODO: Create this shader in init
var shader

// Run once at the beginning: use this to create
// and setup things to be used in your draw function.
exports.init = function(gl) {

  //TODO: Initialize the shader here

}

// Run every frame: use this to draw things to the screen.
exports.draw = function(gl) {
  //Clear drawing buffer
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  //TODO: Bind the shader here

  //Now draw the triangle
  drawTriangle(gl)
}
