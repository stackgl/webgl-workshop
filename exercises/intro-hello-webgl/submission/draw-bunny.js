// You don't need to worry about the contents
// of this file for the time being – it's just
// here to make the exercise itself easier for
// you!

var Camera  = require('canvas-orbit-camera')
var Shader  = require('gl-shader-core')
var Geom    = require('gl-geometry')
var mat4    = require('gl-matrix').mat4
var quat    = require('gl-matrix').quat
var unindex = require('unindex-mesh')
var faces   = require('face-normals')
var bunny   = require('bunny')

bunny = {
  positions: unindex(bunny.positions, bunny.cells)
}

bunny.normals = faces(bunny.positions)

module.exports = createBunny

var start = Date.now()

function createBunny(gl) {
  var proj = mat4.create()
  var view = mat4.create()
  var geom = Geom(gl)
    .attr('position', bunny.positions)
    .attr('normal', bunny.normals)

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
    , 'varying vec3 anormal;'
    , 'attribute vec3 position;'
    , 'attribute vec3 normal;'
    , 'void main() {'
    , '  anormal = normal;'
    , '  gl_Position = proj * view * vec4(position, 1);'
    , '}'
  ].join('\n')

  var fragSource = [
      'precision mediump float;'
    , 'varying vec3 anormal;'
    , 'void main() {'
    , '  gl_FragColor = vec4(mix(abs(anormal), vec3(1), 0.25), 1);'
    , '}'
  ].join('\n')

  var shader = Shader(gl
    , vertSource
    , fragSource
    , uniforms
    , []
  )

  return function(gl, t) {
    var width  = gl.drawingBufferWidth
    var height = gl.drawingBufferHeight

    gl.viewport(0, 0, width, height)
    gl.enable(gl.DEPTH_TEST)

    geom.bind(shader)

    mat4.perspective(proj
      , Math.PI / 4
      , width / height
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
