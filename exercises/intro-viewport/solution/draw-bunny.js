// You don't need to worry about the contents
// of this file for the time being – it's just
// here to make the exercise itself easier for
// you!

var Camera = require('canvas-orbit-camera')
var Shader = require('gl-shader-core')
var Geom   = require('gl-geometry')
var mat4   = require('gl-matrix').mat4
var quat   = require('gl-matrix').quat
var bunny  = require('bunny')

module.exports = createBunny

function drawBunny(gl) {
  gl.__BUNNY__ = gl.__BUNNY__ || createBunny(gl)
  gl.__BUNNY__(gl)
}

function createBunny(gl) {
  var proj = mat4.create()
  var view = mat4.create()
  var geom = Geom(gl)
    .attr('position', bunny.positions)
    .faces(bunny.cells)

  var camera = Camera(gl.canvas, {
      pan: false
    , scale: false
    , rotate: false
  })

  var uniforms = [{
      name: 'proj'
    , type: 'mat4'
  }, {
      name: 'view'
    , type: 'mat4'
  }]

  var vertSource = [
      'precision mediump float;'
    , 'uniform mat4 proj;'
    , 'uniform mat4 view;'
    , 'attribute vec3 position;'
    , 'void main() {'
    , '  gl_Position = proj * view * vec4(position, 1);'
    , '}'
  ].join('\n')

  var fragSource = [
      'precision mediump float;'
    , 'void main() {'
    , '  gl_FragColor = vec4(1);'
    , '}'
  ].join('\n')

  var shader = Shader(gl
    , vertSource
    , fragSource
    , uniforms
    , []
  )

  return function(gl, t) {
    geom.bind(shader)

    mat4.perspective(proj
      , Math.PI / 4
      , gl.drawingBufferWidth / gl.drawingBufferHeight / 2
      , 0.01
      , 100
    )

    quat.identity(camera.rotation)
    quat.rotateY(camera.rotation, camera.rotation, t * 0.001)
    camera.distance = 20
    camera.center = [0, 4, 0]
    camera.view(view)

    shader.uniforms.proj = proj
    shader.uniforms.view = view
    geom.draw(gl.TRIANGLES)
  }
}
