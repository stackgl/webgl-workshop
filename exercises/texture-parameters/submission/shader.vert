precision mediump float;

attribute vec2 position;

uniform vec2 scale;

varying vec2 uv;

void main() {
  uv = 0.5 * vec2(scale.x*position.x + 1.0, 1.0 - scale.y*position.y);
  gl_Position = vec4(position, 0, 1);
}
