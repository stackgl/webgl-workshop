# Exercise

For this exercise, you should create and bind a pair of textures whose contents are in BG1 and BG2.  Filtering on the textures should use `gl.NEAREST` and they should be periodic along both axes.

The texture for BG1 should be bound to texture unit 0 and the texture for BG2 should be bound to texture unit 1.

# Texture units

In order to use more than one texture at a time in a shader, it is necessary to bind the input textures to different texture unit.  A texture unit is basically a slot into which you can store a given texture unit.

To select a texture unit, you use the `gl.activeTexture` function.  For example, to select texture unit 0, you would do:

```javascript
gl.activeTexture(gl.TEXTURE0)
```

Then any subsequent calls to `gl.bindTexture()` would store the texture in the first slot.  To bind to other texture units, you add the number of the unit you want to bind to the `gl.TEXTURE0` parameter.  For example, here is how you select texture unit 5:

```javascript
//Set texture unit 5 as active
gl.activeTexture(gl.TEXTURE0 + 5)
```

Once you have a texture bound on a texture unit, you can tell you shader to use it by sending the number of the texture unit using `gl.uniform1i`.  For example, suppose that we have a shader with the following uniform:

```glsl
uniform sampler2D MyTexture;
```

And suppose that we want to set `myTexture` to read from texture unit 2.  Then in WebGL, we can run the following command:

```javascript
gl.uniform1i(uMyTexture, 2)
```
