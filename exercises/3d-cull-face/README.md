## Exercise

For this exercise, you should render the model with all front faces culled.

## Face culling

WebGL supports selectively rendering either the front or back faces of a triangle through a feature called *face culling*.  This can be used for optimization purposes (by reducing the total number of fragments which must be processed) or for certain rendering effects like transparency and shadows.

To turn on face culling, we call:

```javascript
gl.enable(gl.CULL_FACE)
```

And you can turn it off with the command:

```javascript
gl.disable(gl.CULL_FACE)
```

Once you have face culling turned on, you can tell WebGL which faces to cull using the `gl.cullFace` command.  For example, to disable rendering backwards facing triangles you can use:

```javascript
gl.cullFace(gl.BACK)
```

Possible arguments for this function are:

* `gl.FRONT` - cull front facing triangles
* `gl.BACK` - cull back facing triangles
* `gl.FRONT_AND_BACK` - cull both front and back facing triangles