precision mediump float;

uniform sampler2D image;

varying vec2 uv;

void main() {
  gl_FragColor = texture2D(image, uv);
}
