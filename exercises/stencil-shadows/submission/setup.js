var DATA = require('./data.json')

var DIFFUSE_COLOR = [0.8, 0.6, 0.9]
var AMBIENT_COLOR = [0.3, 0.2, 0.3]

var MESH_VERT = '\
precision mediump float;\
attribute vec3 position, normal;\
\
uniform vec3 lightDir;\
uniform mat4 camera;\
\
varying float intensity;\
\
void main() {\
  intensity = max(-dot(lightDir, normal), 0.0);\
  gl_Position = camera * vec4(position, 1);\
}'

var MESH_FRAG = '\
precision mediump float;\
\
uniform vec3 diffuse, ambient;\
\
varying float intensity;\
\
void main() {\
  gl_FragColor = vec4(diffuse * intensity + ambient,1);\
}'

var MESH_ATTRIBS = [ 
  'position', 'normal' 
]

var SHADOW_VERT = '\
precision mediump float;\
attribute vec3 normal0, normal1;\
attribute vec4 position;\
\
uniform vec3 lightDir;\
uniform mat4 camera;\
\
void main() {\
  if(dot(normal0, lightDir) <= 0.0 &&\
    dot(normal1, lightDir) >= 0.0) {\
    gl_Position = camera*(position + vec4((1.0-position.w) * lightDir, 0.0));\
  } else {\
    gl_Position = vec4(0,0,0,0);\
  }\
}'

var SHADOW_FRAG = '\
precision mediump float;\
\
void main() {\
  if(gl_FrontFacing) {\
    gl_FragColor = vec4(0,1,0,1);\
  } else {\
    gl_FragColor = vec4(1,0,0,1);\
  }\
}'

var SHADOW_ATTRIBS = [ 
  'position', 'normal0', 'normal1'
]

var SHADOW_CAP_VERT = '\
precision mediump float;\
attribute vec3 position, normal;\
\
uniform vec3 lightDir;\
uniform mat4 camera;\
\
vec4 extend(vec3 p) {\
  vec4 tlightDir = camera * vec4(lightDir,0);\
  vec3 light = normalize(tlightDir.xyz);\
  vec3 dpos = (1.0 - p) / light;\
  vec3 dneg = (vec3(-1.0,-1.0,0.0) - p) / light;\
  vec3 dt   = mix(dneg, dpos, step(0.0, light));\
  return vec4(0.999 * min(min(dt.x, dt.y), dt.z) * light + p, 1);\
}\
\
void main() {\
  vec4 projected = camera * vec4(position,1);\
  if(dot(normal,lightDir) <= 0.0) {\
    gl_Position = projected;\
  } else {\
    gl_Position = extend(projected.xyz/projected.w);\
  }\
}'

function compileShader(gl, type, src) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  console.log(gl.getShaderInfoLog(shader))
  return shader
}

function createProgram(gl, vert, frag, attribs, uniforms) {
  var fragShader = compileShader(gl, gl.FRAGMENT_SHADER, frag)
  var vertShader = compileShader(gl, gl.VERTEX_SHADER, vert)

  var program = gl.createProgram()
  gl.attachShader(program, fragShader)
  gl.attachShader(program, vertShader)

  for(var i=0; i<attribs.length; ++i) {
    gl.bindAttribLocation(program, i, attribs[i])
  }

  gl.linkProgram(program)

  var uresult = {
    program: program
  }

  for(var i=0; i<uniforms.length; ++i) {
    uresult[uniforms[i]] = gl.getUniformLocation(program, uniforms[i])
  }

  return uresult
}

function createBuffer(gl, data) {
  var buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, 
    new Float32Array(data), 
    gl.STATIC_DRAW)
  return buffer
}

module.exports = function setup(gl) {

  gl.frontFace(gl.CW)
  gl.viewport(
    0,0,
    gl.drawingBufferWidth,
    gl.drawingBufferHeight)

  function computeCamera(t) {
    var theta = Math.PI * Math.cos(0.000357*t)
    var c = Math.cos(theta)
    var s = Math.sin(theta)
    return [c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0.5, 1]
  }

  function computeLightDir(t) {
    var w = 1.0/Math.sqrt(2)
    var theta = 0.001*t
    return [w*Math.cos(theta),-w,w*Math.sin(theta)]
  }

  var meshProgram = createProgram(gl,
    MESH_VERT,
    MESH_FRAG,
    MESH_ATTRIBS,
    [ 'lightDir', 'camera', 'diffuse', 'ambient' ])

  var meshBuffer = createBuffer(gl, DATA.MESH)

  function drawMesh(t, intensity) {
    var lightDir = computeLightDir(t)
    var camera = computeCamera(t)

    gl.useProgram(meshProgram.program)
    gl.uniform3fv(meshProgram.lightDir, lightDir)
    gl.uniform3f(meshProgram.diffuse, 
      intensity*DIFFUSE_COLOR[0],
      intensity*DIFFUSE_COLOR[1],
      intensity*DIFFUSE_COLOR[2])
    gl.uniform3fv(meshProgram.ambient, AMBIENT_COLOR)
    gl.uniformMatrix4fv(meshProgram.camera, false, camera)

    gl.bindBuffer(gl.ARRAY_BUFFER, meshBuffer)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0)
    gl.enableVertexAttribArray(1)
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12)
    
    gl.drawArrays(gl.TRIANGLES, 0, DATA.MESH.length/6)
  }

  var shadowProgram = createProgram(gl, 
    SHADOW_VERT, 
    SHADOW_FRAG, 
    SHADOW_ATTRIBS,
    [ 'lightDir', 'camera' ])

  var shadowCapProgram = createProgram(gl, 
    SHADOW_CAP_VERT, 
    SHADOW_FRAG, 
    MESH_ATTRIBS,
    [ 'lightDir', 'camera' ])
  
  var shadowBuffer = createBuffer(gl, DATA.SHADOW)

  function drawShadow(t) {
    var lightDir = computeLightDir(t)
    var camera = computeCamera(t)

    //Draw silhoutte
    gl.useProgram(shadowProgram.program)
    gl.uniform3fv(shadowProgram.lightDir, lightDir)
    gl.uniformMatrix4fv(shadowProgram.camera, false, camera)

    gl.bindBuffer(gl.ARRAY_BUFFER, shadowBuffer)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 40, 0)
    gl.enableVertexAttribArray(1)
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 40, 16)
    gl.enableVertexAttribArray(2)
    gl.vertexAttribPointer(2, 3, gl.FLOAT, false, 40, 28)

    gl.drawArrays(gl.TRIANGLES, 0, DATA.SHADOW.length/10)

    //Draw caps
    gl.useProgram(shadowCapProgram.program)
    gl.uniform3fv(shadowCapProgram.lightDir, lightDir)
    gl.uniformMatrix4fv(shadowCapProgram.camera, false, camera)

    gl.bindBuffer(gl.ARRAY_BUFFER, meshBuffer)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 24, 0)
    gl.enableVertexAttribArray(1)
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 24, 12)
    
    gl.drawArrays(gl.TRIANGLES, 0, DATA.MESH.length/6)
  }

  return {
    shadow: drawShadow,
    mesh:   drawMesh
  }
}
