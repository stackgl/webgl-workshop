# Exercise

Partition the screen into 4 equally sized colored rectangles, with two on top and two on the bottom.  These rectangles should have the following colors:

* top-left: Red
* top-right: Green
* bottom-left: Blue
* bottom-right: Yellow

You should do this using only the `gl.clear`, `gl.scissor` and `gl.enable` commands as we saw earlier.

# Scissor Tests and Capabilities

Sometimes it is useful to split the drawing buffer into smaller pieces, for
example when updating a portion of an image.

The scissor test is similar to `gl.viewport`, with the key difference being that
it doesn't change the position of the edges of an image. So, while changing the
viewport is similar to resizing an image, a scissor test is similar to cropping
an image.

To turn on the *scissor test*, you first call the following method on the WebGL
context:

```javascript
gl.enable(gl.SCISSOR_TEST)
```

We will use this `gl.enable` method many more times in these lessons.  The basic usage for the command is as follows:

## `gl.enable(capability)`

> Turns on the specified `capability`, modifying all subsequent drawing commands. The exact effects depend on the capability specified.

Once the scissor test is enabled, you can set the region of the drawing buffer which will be updated using the `gl.scissor` command:

## `gl.scissor(x, y, width, height)`

> Sets the scissor region. `x,y` is the pixel coordinate of the lower left corner of the scissor region and `width,height` are the dimensions of the scissor rectangle in pixels.

When we are all done using the scissor test, we can turn it off using the `gl.disable` command:

```javascript
gl.disable(gl.SCISSOR_TEST)
```

## `gl.disable(capability)`

> Turns off `capability`, undoing the effect of `gl.enable()`

To get the size of the drawing buffer in pixels, you can use the `gl.drawingBufferWidth` and `gl.drawingBufferHeight` properties of the WebGL context.
