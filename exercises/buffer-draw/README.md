# Exercise

For this exercise, a buffer and shader has been prepared for you and all attribute values have been set.  You should use the draw arrays command to draw the following primitives in this order:

1. A line loop with 32 vertices starting at vertex 99
1. A triangle fan with 5 vertices starting at vertex 131
1. 32 lines starting from vertex 35
1. 32 points starting from vertex 3
1. A single triangle starting from vertex 0

# Basic Drawing

Once we have a buffer and shader set up, along with all the associated attribute pointers, we can finally start drawing stuff.  This is done using the `gl.drawArrays` command.  Here is an example of what a call to drawArrays looks like:

```javascript
gl.drawArrays(gl.TRIANGLES, 0, 12)
```

The interface for this function is as follows:

## `gl.drawArrays(type, offset, count)`
* `type` is the type of primitive to draw
* `offset` is the starting vertex to draw from
* `count` is the number of **vertices** to draw

The possible values for `type` are as follows:

* `gl.TRIANGLES` draws a list of triangles.  Note that `count` must be a multiple of 3 for this to work
* `gl.LINES` draws a list of line segments.  `count` must be a multiple of `2`
* `gl.POINTS` draws a list of points.
* `gl.LINE_STRIP` draws a connected polyline between each subsequent vertex
* `gl.LINE_LOOP` like `gl.LINE_STRIP`, except the first and last vertices are connected
* `gl.TRIANGLE_FAN` keeping the first vertex fixed, draws a triangle for each subsequent edge in the sequence of vertices
* `gl.TRIANGLE_STRIP` draws a triangle for every 3 consecutive vertices in the list
