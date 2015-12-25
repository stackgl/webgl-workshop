# Exercise

For this exercise, you will set up attribute pointers for a slightly more complicated buffer.  Here we are going to implement part of an image morphing algorithm.  The shader and data for the morph here have all been provided for you, but it is up to you to configure the vertex attribute pointers.

Specifically, there are two attributes here, which we will call `start` and `end` at locations `0` and `1` respectively.  Both of these attributes are of type `vec2` and stored in the buffer as floating point numbers.  That is, the memory for the buffer looks like this:

```javascript
[
  startx0, starty0, endx0, endy0, // vertex 0
  startx1, starty1, endx1, endy1, // vertex 1
  startx2, starty2, endx2, endy2, // vertex 2
  ...
]
```

You should set up attribute pointers for this buffer.

# Info and hints

Here's the `gl.vertexAttribPointer` method signature for your reference:

`gl.vertexAttribPointer(location, size, type, normalized, stride, offset)`

Remember `stride` and `offset` must be given in bytes.
