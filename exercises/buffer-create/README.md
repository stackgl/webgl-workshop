# Exercise

For this exercise, you will go through the process of creating and initializing a buffer.  You are provided with a shell that handles shader creation and drawing the buffer for you.  What you should do is take the data stored in the array `DATA`, convert it into a `Float32Array` and then store that within `buffer`.  In the drawing loop, you should bind the buffer and then call `drawIt` to render the image.

# Buffer Creation

In this lesson, we are going to learn how to upload attribute data to WebGL.  Vertex attributes are read from arrays of binary data called *buffers*.  To create a buffer, you use the aptly named `gl.createBuffer` command:

```javascript
var buffer = gl.createBuffer(gl.ARRAY_BUFFER)
```

The interface of this method is as follows:

## `gl.createBuffer(type)`
> Creates a buffer.  For now, we will leave type as `gl.ARRAY_BUFFER`.

Once a buffer has been created, we need to bind it so that we can upload data to the buffer and select attributes from it.  This is done with the `gl.bindBuffer` command:

```javascript
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
```

## `gl.bindBuffer(type, buffer)`
> Binds a buffer to an active slot.

After a buffer has been bound, we can then upload data with the `gl.bufferData` command:

```javascript
var data = new Float32Array([1,2,3,4,5,6])
gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)
```

## `gl.bufferData(type, data, usageHint)`
> Uploads data to a buffer.  `type` is the type of the buffer (for now `gl.ARRAY_BUFFER`).  `data` is either a number representing the size of the buffer to reserve, or a typed array representing data to allocate. `usageHint` is a flag which has no semantic effect, but can be one of the following values:

* `gl.DYNAMIC_DRAW`
* `gl.STREAM_DRAW`
* `gl.STATIC_DRAW`

> The behavior of `usageHint` is driver dependent and is only used for performance hints. `gl.DYNAMIC_DRAW` for buffers that are updated frequently, and `gl.STATIC_DRAW` for buffers that won't change, and `gl.STREAM_DRAW` for buffers that are created once and used once.
