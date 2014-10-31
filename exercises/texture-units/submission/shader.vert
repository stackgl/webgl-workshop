precision mediump float;

attribute vec2 position;

varying vec2 uv;

void main() {
  uv = 0.5 * vec2(1.0+position.x, 1.0-position.y);
  gl_Position = vec4(position, 0, 1);
}
