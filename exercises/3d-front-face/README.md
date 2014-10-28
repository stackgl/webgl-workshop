# Back and front faces

## Exercise

In this exercise you should set the front face to clockwise.

## Face orientation

When drawing a triangle, it is possible for the vertices to be oriented in one of two ways:  clockwise or counter-clockwise. WebGL distinguishes between these two cases, labeling one of them (default counter clockwise) to the front face, and the other face as the back face.  This behavior can be changed using the `gl.FRONT_FACE` command:

```javascript
gl.frontFace(gl.CW)
```

This command takes one of two arguments:

* `gl.CW` for clockwise
* `gl.CCW` for counter-clockwise