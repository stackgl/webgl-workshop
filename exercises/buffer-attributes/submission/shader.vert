precision mediump float;

attribute vec2 position;
uniform vec2 uScreenSize;

void main() {
  vec2 pos = position * 1.5;
  pos.x *= uScreenSize.y / uScreenSize.x;
  gl_Position = vec4(pos, 0, 1);
}
