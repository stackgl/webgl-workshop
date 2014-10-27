# Exercise

Use `gl.clear` to clear the screen twice: the first time, clear the entire
screen to white. The second time, fill the center of the screen with black
such that there is a 20-pixel wide white border around the edges.

# `gl.viewport`

By default, WebGL doesn't always draw within the full bounds of the canvas: you
need to manually set the **viewport** to tell WebGL what parts of the screen to
draw to.

This is useful in cases where you might want to draw the scene to a portion
of the canvas, for example in split-screen games.

For example, if you wanted to draw your scene within a 512×512 square, you
would use the following before you call any drawing functions:

``` javascript
var top = 0
var left = 0
var width = 512
var height = 512

gl.viewport(top, left, width, height)
```

Most of the time, you want to draw to fill the entire screen. You can do that
like so:

``` javascript
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
```
