# Exercise

Draw 4 overlapping rectangles with additive blending and the weight `gl.SRC_ALPHA` for the source fragment and `gl.ONE_MINUS_SRC_ALPHA` for the destination fragment.

# Blending

In WebGL, blending combines the contents of the currently rendered fragment with the color value stored in the drawing buffer to compute a new color value.

By convention, the fragment being drawn is called the *source* and the fragment in the drawing buffer is called the *destination*.

By default, the new fragment color is just the source color, however if we turn on blending:

```javascript
gl.enable(gl.BLEND)
```

Then the color of the resulting fragment is computed as a weighted combination of the source and destination fragments. To specify these weights, we can use the following command:

#### `gl.blendFuncSeparate(sourceRGB, sourceAlpha, destRGB, destAlpha)`

Each of the parameter `sourceRGB`, `sourceAlpha`, `destRGB`, `destAlpha` describes the weight which is applied to either the source or destination fragment.  The possible values for these weights are as follows:

* `gl.ZERO`: (0,0,0,0)
* `gl.ONE`: (1,1,1,1)
* `gl.SRC_COLOR`: (Rs, Gs, Bs, As)
* `gl.ONE_MINUS_SRC_COLOR`: (1,1,1,1)−(Rs,Gs,Bs,As)
* `gl.DST_COLOR`: (Rd, Gd, Bd, Ad)
* `gl.ONE_MINUS_DST_COLOR`: (1,1,1,1)−(Rd,Gd,Bd,Ad)
* `gl.SRC_ALPHA`: (As, As, As, As)
* `gl.ONE_MINUS_SRC_ALPHA`: (1,1,1,1)−(As,As,As,As)
* `gl.DST_ALPHA`: (Ad, Ad, Ad, Ad)
* `gl.ONE_MINUS_DST_ALPHA`: (1,1,1,1)−(Ad,Ad,Ad,Ad)

By convention, (Rs, Gs, Bs, As) are the components of the source color and (Rd, Gd, Bd, Ad) are the components of the destination color.

There are also `gl.CONSTANT_COLOR, gl.ONE_MINUS_CONSTANT_COLOR, gl.CONSTANT_ALPHA, gl.ONE_MINUS_CONSTANT_ALPHA` and `gl.SRC_ALPHA_SATURATE`, but don't worry about them for now.

In addition to the above blend functions, you can also change how the 

#### `gl.blendEquationSeparate(modeRGB, modeAlpha)`

`modeRGB` and `modeAlpha` control the two different ways of 

* `gl.FUNC_ADD`
* `gl.FUNC_SUBTRACT`
* `gl.FUNC_REVERSE_SUBTRACT`

