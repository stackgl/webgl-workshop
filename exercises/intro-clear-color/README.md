# Exercise

For this exercise, write a method which takes a WebGL context as input and clears the background color to opaque magenta (fully saturated red and blue, no green).

# Clearing the Drawing Buffer

In WebGL, the drawing buffer is a 2D array of pixels representing the image that the user sees. Rendering in WebGL consists of calling methods on the WebGL context which update the contents of the drawing buffer.  Before drawing, we usually want to clear the contents of the drawing buffer to some constant value so that whatever was left in it isn't sitting around.  The standard way to do this is with the `gl.clear` method, which zaps the contents of the drawing buffer to some specified value.  Here is an example of how to use `gl.clear()`:

```javascript
//Assume that gl is a WebGL context
function clearScreen(gl) {
  gl.clearColor(1, 0, 0, 1) //Set clear color red, fully opaque
  gl.clear(gl.COLOR_BUFFER_BIT)
}
```

Here we used the following new commands:

## `gl.clearColor(red, green, blue, alpha)`
Sets the clear color to an RGBA triple.  The input arguments are floating point numbers between 0 and 1.

## `gl.clear(gl.COLOR_BUFFER_BIT)`
This clears the color channel of the drawing buffer.  It is possible to pass other values to this function, though we won't worry about this until later.
