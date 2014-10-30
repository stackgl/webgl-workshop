precision mediump float;

attribute vec2 uv;

uniform vec2 offset;
uniform float scale;

void main() {
  gl_Position = vec4(uv * scale + offset, 0, 1);
}
