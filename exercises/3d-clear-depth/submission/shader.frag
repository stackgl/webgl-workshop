precision mediump float;

varying vec3 color;

void main() {
  vec3 fcolor = color - min(color.x,min(color.y,color.z));
  gl_FragColor = vec4(fcolor / max(fcolor.x,max(fcolor.y,fcolor.z)),1);
}
