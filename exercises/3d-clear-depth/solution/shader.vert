precision mediump float;

attribute vec3 position;

varying vec3 color;

void main() {
  vec2 np = position.xy;
  color = normalize(vec3(
    dot(np, vec2(1,0)),
    dot(np, vec2(-0.5, 0.8660254037844386)),
    dot(np, vec2(-0.5,-0.8660254037844386))));
  gl_Position = vec4(position,1);
}
