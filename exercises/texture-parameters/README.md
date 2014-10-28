# Exercise

For this exercise you should configure a texture so that:

* Minification and magnification use linear filtering
* The s-axis repeats
* The t-axis is mirrored

# More on Parameters

As we just saw, textures are basically 2D grids of pixels with well defined colors at each grid point.  However, in GLSL it is possible to:

* Sample textures at values in between different grid points
* Sample textures outside of the bounds of the normal grid

In these cases, we need to tell WebGL what to do so that it can figure out how to handle these cases consistently.  This is done using the `gl.texParameteri` command which has the following interface:

## `gl.texParameteri(gl.TEXTURE_2D, parameter, value)`
Where:

* `parameter` is the name of the parameter to set
* `value` is the value to set the parameter to

# Filtering

The first of these issues (or how to handle values between grid points) is handled using filtering.  WebGL makes a distinction between filtering when zooming into a texture and when zooming out.  These are handled by the magnification and minification filtering modes respectively and specified using the following parameters:

* `gl.TEXTURE_MAG_FILTER` - magnification filter mode
* `gl.TEXTURE_MIN_FILTER` - minification filter mode

These parameters can be set to the following values:

* `gl.NEAREST` rounds the sample coordinate to closest grid point in the texture
* `gl.LINEAR` interpolates the texture value using bilinear interpolation

There are also some extra filtering modes for minification related to mipmapping, but we will come back to them later.  (Don't worry about them for now.)

# Wrapping

The other issue is how textures are handled when accessed outside of bounds.  In WebGL, there are three ways to handle this situation:

* `gl.CLAMP_TO_EDGE` the coordinate is clamped to the boundary
* `gl.REPEAT` the coordinate wraps around cyclically
* `gl.MIRRORED_REPEAT` the coordinate is reflected along the boundary

And these behaviors can be applied independently to either axis of the texture:

* `gl.TEXTURE_WRAP_S`
* `gl.TEXTURE_WRAP_T`
