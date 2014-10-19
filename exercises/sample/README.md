# Sample Lesson

As before, this content will be loaded into the lesson description.

The following sections are simply to test Markdown formatting:

* Point 1
* Point 2
* Point 3

``` glsl
#define TAU 6

precision mediump float;

attribute vec3 color;

void main() {
  color.r = (sin(color.r * TAU) + 1.0) * 0.5;

  gl_FragColor = vec4(color, 1.0);
}
```
