# Exercise

In this exercise, you should draw 3 horizontal lines with different widths:

* A red width `1` line at `y=-0.5`
* A green width `5` line at `y=0`
* A white width `10` line at `y=0.5`

A function to draw the lines has been provided for you, all you need to do is call `gl.lineWidth` at the appropriate places.

# Line width

By default every line drawn in WebGL using `gl.LINES` is 1 pixel wide.  You can change this behavior with the `gl.lineWidth` command.  `gl.lineWidth` sets the width of a line in pixels to whatever value is specified.  For example, to set the line width to `8` you would do:

```javascript
gl.lineWidth(8)
```