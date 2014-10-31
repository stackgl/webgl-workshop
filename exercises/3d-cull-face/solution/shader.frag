precision mediump float;

varying vec3 light;
varying vec3 coord;

void main() {
  float x = max(light.x,0.0);
  float y = max(-light.x,0.0);
  if(gl_FrontFacing) {
    gl_FragColor = vec4(0.6+x+max(-light.y,0.0),x,-2.0*coord.z+x,1);
  } else {
    gl_FragColor = vec4(y+max(light.y,0.0),0.6+y+0.2*max(light.y,0.0),-2.0*coord.z+y,1);
  }
}
