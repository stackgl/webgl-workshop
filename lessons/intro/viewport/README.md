# The viewport

Sometimes it is useful to split the drawing buffer into smaller pieces, for example when rendering split screen effects or updating a portion of an image.  To do this, one can use the `gl.viewport` function to mark only a portion of the drawing buffer as active.  The input to the `gl.viewport` function is as follows:

#### `gl.viewport(left, top, width, height)`
Sets the viewport region starting from the left

It is a good idea to set the size of the viewport every frame before you start drawing -- especially if you have just resized the WebGL context.  

To get the size of the drawing buffer in pixels, you can use the `gl.drawingBufferWidth` and `gl.drawingBufferHeight` properties of the WebGL context.

## Exercise

Partition the screen into 4 equally sized colored rectangles, with two on top and two on the bottom.  These rectangles should have the following colors:

* top-left: Red
* top-right: Green
* bottom-left: Blue
* bottom-right: Yello

You should do this using only the `gl.clear` and `gl.viewport` commands.  To get started, modify the template:

```javascript
module.exports = function(gl) {
  //Draw 4 colored rectangles
}
```