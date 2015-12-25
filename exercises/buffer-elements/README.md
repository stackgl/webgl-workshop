# Exercise

For this exercise you will draw a mesh using indexed arrays.  A shader with the necessary vertex attributes is provided for you.  It is up to you to set up the element array buffer and draw the object.

The contents of the element array buffer are provided for you in a native array called `ELEMENT_DATA` and the number of elements to draw is stored in the variable `ELEMENT_COUNT`.

# Element Array Buffers

Drawing too many vertices in WebGL can become expensive.  This is because each vertex consumes some fixed amount of memory and must be processed by a vertex shader.  To optimize rendering, it is therefore useful to reduce the number of vertices which are sent to the GPU.

One way to do this is with *indexed drawing*. In indexed drawing, send two pieces of data to WebGL:

* A buffer full of vertex attributes
* A second buffer full of pointers to vertices

The primitives are then drawn using the indices from the second array.  The advantage to doing things this way is that it allows us to reuse the same vertex in multiple primitives.

These buffers of pointers are called *element array buffers* and are created in almost the same way as normal array buffers.  For example suppose that we wanted to create an element array buffer with the following array of vertex indices:

```javascript
var indices = [
  0, 1, 2,   // First triangle
  3, 4, 5,   // Second triangle
  0, 2, 4    // Third triangle
]
```

Then we can initialize an element array buffer with these indices as follows:

```javascript
var elementBuffer = gl.createBuffer(gl.ELEMENT_ARRAY_BUFFER)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
  new Uint16Array(indices),
  gl.STATIC_DRAW)
```

There are two important things which are different here from before:

* Instead of using `gl.ARRAY_BUFFER`, we use `gl.ELEMENT_ARRAY_BUFFER`
* Input data to an element array buffer **MUST** be in a `Uint16Array`

This last point is a default technical restriction in WebGL, though there are some extensions which can change this behavior.

Once we have an element array buffer set up, we can use it to draw things by calling the `gl.drawElements` command.  For example:

```javascript
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer)
gl.drawElements(gl.TRIANGLES, 9, gl.UNSIGNED_SHORT, 0)
```

The arguments to this command are as follows:

## `gl.drawElements(type, count, gl.UNSIGNED_SHORT, offset)`
The behavior here is almost exactly the same as `gl.drawArrays` except:

* The order of `count` and `offset` is switched in the arguments
* There is this extra `gl.UNSIGNED_SHORT` argument which you must pass in (no other values are allowed)
* Primitives are drawn using indices from the element array buffer instead of reading directly from the current array buffer
