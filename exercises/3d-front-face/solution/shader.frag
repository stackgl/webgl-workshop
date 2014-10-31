precision mediump float;

varying float light;
varying vec3 coord;

void main() {
  if(coord.z < 0.0) {
    discard;
  }
  float x = max(light,0.0);
  float y = max(-light,0.0);
  if(gl_FrontFacing) {
    gl_FragColor = vec4(0.6+x,x,x,1);
  } else {
    gl_FragColor = vec4(y,0.6+y,y,1);
  }
}
