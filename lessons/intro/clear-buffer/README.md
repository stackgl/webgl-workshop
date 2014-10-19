# The drawing buffer

In WebGL, the drawing buffer is a 2D array of pixels which is displayed to the users. Rendering in WebGL consists of calling methods on the WebGL context which update the contents of the drawing buffer.  One of the most fundamental methods is `gl.clear`, which zaps the contents of the drawing buffer.  Here is an example of how to use `gl.clear()`:

```javascript
//Assume that gl is a WebGL context
function clearScreen(gl) {
  gl.clearColor(1, 0, 0, 1) //Set clear color red, fully opaque
  gl.clear(gl.COLOR_BUFFER_BIT)
}
```

Here we used the following new commands:

### `gl.clearColor(red, green, blue, alpha)`
Sets the clear color to an rgba triple.  The input arguments are floating point numbers between 0 and 1.

### `gl.clear(gl.COLOR_BUFFER_BIT)`
This clears the color channel of the drawing buffer.  It is possible to pass other values to this function, though we won't worry about this until later.

## Exercise
For this exercise, write a method which takes a WebGL context as input and clears the background color to opaque magenta (fully satured red and blue, no green).  To help get started, here is a shell:

```javascript
module.exports = function(gl) {
  //Clear drawing buffer to magenta
}
```