# Exercise

For this lesson, you will be given a vertex buffer and a shader, and you should then set up an attribute pointer and draw the contents of the buffer.  The attribute is a `vec2` at location 0, and the buffer is a densely packed float array.

# Setting up Attribute Pointers

As we saw in the last lesson, buffers store data for vertex attributes. However, just storing the data is not enough, we also need to tell the vertex shader where it is. This is done with attribute pointers.

Vertex attribute pointers are pointers to slices of buffer data.  The data in a vertex attribute pointer consists of the following:

* An index to the attribute location
* The data type of the attribute (float, vec2, vec3, etc.)
* An offset to the start of the attribute
* A stride representing the distance (in bytes) between attributes

This is a bit much to unpack, so lets walk through the details step by step.  First, suppose that we have a vertex shader with an attribute at location `0` of type `vec3`:

```glsl
attribute vec3 position;  //At location 0
```

And that the data for the vertices is encoded as follows:

```javascript
var data = [
  x0, y0, z0,   //Components of first vertex
  x1, y1, z1,   //Components of second vertex
  x2, y2, z2,   //Components of third vertex
   ...
]
```

And is uploaded to a buffer as follows:

```javascript
var buffer = gl.createBuffer(gl.ARRAY_BUFFER)
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW)
```

From here, there are two commands that we need to call to set up an attribute pointer.  First, we need to tell WebGL to use an attribute pointer instead of constant attribute value:

```javascript
gl.enableVertexAttribArray(0)
```

Which works as follows:

## `gl.enableVertexAttribArray(location)`
> Tells WebGL to use an attribute pointer for the attribute at `location`

And once this is done, we can then specify the data of the pointer using the following method:

```javascript
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0)
```

This method is pretty complicated, so let's unpack how it works:

## `gl.vertexAttribPointer(location, size, type, normalized, stride, offset)`
> Sets up an attribute pointer for the attribute at `location` using the vertex buffer currently bound to `gl.ARRAY_BUFFER`:
* `size` is the size of the attribute in terms of number of elements, e.g.
    + `size=1` means `float`
    + `size=2` means `vec2`
    + `size=3` means `vec3`
    + `size=4` means `vec4`
* `type` is the type of the data in the buffer.  The possible values are `gl.FLOAT, gl.BYTE, gl.SHORT, gl.INT, gl.UNSIGNED_BYTE, gl.UNSIGNED_SHORT, gl.UNSIGNED_INT, gl.FIXED`
* `normalized` is a flag which checks if set for `BYTE, SHORT` or `INT` types rescales them to the range `+/- 1`. This can be useful for encoding values like normals or texture coordinates compactly
* `stride` is the distance between successive attributes in bytes. If set to `0`, then it assumes that the attributes are tightly packed.
* `offset` is a pointer (in bytes) to the start of the first attribute in the array.
