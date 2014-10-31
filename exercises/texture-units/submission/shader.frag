precision mediump float;

uniform sampler2D bg1, bg2;
uniform float scroll;

varying vec2 uv;

void main() {
  vec4 a = texture2D(bg1, vec2(uv.x + scroll, uv.y));
  vec4 b = texture2D(bg2, uv);
  gl_FragColor = a*(1.0-b.a) + b;
}
