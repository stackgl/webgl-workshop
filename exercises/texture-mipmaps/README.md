# Exercise

In this exercise, you should modify the example to enable mipmapping.  Specifically, you should:

* Set the magnification filter to LINEAR
* Set the minification filter to LINEAR_MIPMAP_LINEAR
* Create a mipmap pyramid

# Mipmaps

In WebGL textures are often rendered at radically different sizes.  For objects which are far away from the camera, it may be that a single visible fragment covers many different regions within a texture.

One way to prevent this situation would be to render the entire scene at an extremely high resolution, and then downsample it by filtering to get an accurate smooth picture. This technique is called full screen anti-aliasing, and is commonly applied in geometry.

Unfortunately, the problem with full screen anti-aliasing is that the resolution of the drawing buffer needs to be extremely large in order for it to correctly capture small features (for example textures).

Instead, modern GPUs implement an optimization called mipmapping to support texture rendering for very tiny or distant features.

The way mipmapping works is that the GPU hardware detects when we are trying to render a texture sampled at a very coarse resolution and replaces the texture with a downsampled version.

These downsampled textures are stored in a data structure called a mip pyramid, which consists of downsampled power of two versions of the texture.

When sampling a texture with mipmapping, the GPU first computes the appropriate miplevel, then it applies filtering within that miplevel.  Multiple levels between two mipmaps can also be interpolated.

To turn on mipmapping in WebGL, set `TEXTURE_MIN_FILTER` to one of the following values:

* `gl.NEAREST_MIPMAP_NEAREST`
* `gl.LINEAR_MIPMAP_NEAREST`
* `gl.NEAREST_MIPMAP_LINEAR`
* `gl.LINEAR_MIPMAP_LINEAR`

In these parameters, the first value determines how filtering is done within a mip level, and the second parameter determines how filtering is done between miplevels.

It is possible to manually create a mipmap in WebGL, though for this lesson we will use the built in function `generateMipmap` which works as follows:

```javascript
gl.generateMipmap(gl.TEXTURE_2D)
```

This creates a complete mip pyramid for the currently bound texture.
