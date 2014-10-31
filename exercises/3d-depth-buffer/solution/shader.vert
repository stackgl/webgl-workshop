precision mediump float;

attribute vec3 position;
attribute vec3 color;

uniform float t;

varying vec3 fcolor;

void main() {
  fcolor = vec3(color.rg,position.z);
  gl_Position = vec4(position.x,position.y+t*position.z,position.z, 1);
}
