precision mediump float;
attribute vec3 position;
attribute vec3 normal;

uniform float t;

varying float light;
varying vec3 coord;

void main() {
  light = normal.x;
  float c = cos(t);
  float s = sin(t);
  coord = position;
  vec3 lcoord = vec3(
    c*position.x-s*position.z,
    position.y,
    c*position.z+s*position.x+0.5);
  gl_Position = vec4(lcoord,1);
}
