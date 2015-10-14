# Exercise

For this exercise, you are given a program which will draw a colored triangle, however the attributes are initially screwy.  To fix this, you should switch the location of the color and position attributes.  That is, you must:

* Set the location of the position attribute to `0`
* Set the location of the color attribute to `1`

# Attribute Locations

In addition to uniforms, the way to get data into a shader is with attributes.  Attributes are processed by the vertex shader and used to generate primitives, which are then rasterized by the GPU.

In this lesson, we are going to go through some of the first steps of setting up attributes for a program.

Like uniforms, each vertex attribute is bound to a *location*. However, unlike uniforms these locations can be specified by the user. Attribute locations are represented by integers and data stored in buffers (more on this later) can be accessed from them.

To set an attribute location, you must call the `bindAttribLocation` command on a program object **BEFORE** linking. For example,

```javascript
var program = gl.createProgram()

// ... set up shaders, etc.

gl.bindAttribLocation(program, 0, 'position')
gl.linkProgram(program)
```

## `gl.bindAttribLocation(program, index, name)`
> Sets the location of the attribute called `name` in `program` to `index`.

The location of an attribute must be between `0` and `gl.MAX_VERTEX_ATTRIBS-1`
