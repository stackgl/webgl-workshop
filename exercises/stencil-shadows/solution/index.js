var setup         = require('../submission/setup')
var draw

exports.init = function(gl) {
  draw = setup(gl)
}

exports.draw = function(gl, t) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.clearColor(1,1,1,1)
  gl.clearDepth(1)
  gl.clear(
    gl.COLOR_BUFFER_BIT |
    gl.DEPTH_BUFFER_BIT)

  //----First pass: Draw mesh, no stencil buffer

  //Configure depth buffer
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)
  gl.depthMask(true)

  //Turn off stencil buffer
  gl.disable(gl.STENCIL_TEST)

  //Turn on color write
  gl.colorMask(true, true, true, true)

  //Draw mesh with full light intensity
  draw.mesh(t, 1.0)


  //---Second pass: Draw to stencil buffer

  //Set up depth buffer
  gl.depthMask(false)
  gl.depthFunc(gl.LESS)

  //Set up stencil buffer
  gl.enable(gl.STENCIL_TEST)
  gl.clearStencil(0)
  gl.clear(gl.STENCIL_BUFFER_BIT)
  gl.stencilMask(~0)
  gl.stencilFunc(gl.ALWAYS, 0, ~0)
  gl.stencilOpSeparate(gl.BACK, gl.KEEP, gl.INCR_WRAP, gl.KEEP)
  gl.stencilOpSeparate(gl.FRONT, gl.KEEP, gl.DECR_WRAP, gl.KEEP)

  //Set up color buffer
  gl.colorMask(false,false,false,false)

  //Draw shadow volume
  draw.shadow(t)

  //----Final pass: Draw mesh with shadows

  //Set up depth buffer
  gl.depthFunc(gl.LEQUAL)

  //Set up stencil buffer
  gl.stencilFunc(gl.NOTEQUAL, 0, ~0)
  gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP)

  //Turn on color mask
  gl.colorMask(true, true, true, true)

  //Draw mesh with 1/10th light intensity
  draw.mesh(t, 0.1)
}
