attribute vec3 color;
attribute vec2 position;

varying vec3 fcolor;

void main() {
  fcolor = color;
  gl_Position = vec4(position, 0, 1);
}
