# Exercise

Currently your submission is rendering a bunny that is stretched out across
the entire canvas. Change it to match the example above: we want two bunnies,
one each covering one half of the screen.

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

gl.viewport(left, top, width, height)
```

Most of the time, you want to draw to fill the entire screen. You can do that
like so:

``` javascript
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
```
