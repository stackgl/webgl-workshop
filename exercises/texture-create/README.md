# Exercise

For this exercise you should create a texture from a given array of pixels and bind the result to texture 2D.  Your texture must not use any filtering.

# Textures

After buffers, the other major way to store data in WebGL is through textures.  Unlike a buffer, it is possible to read any random value from a texture at any point in a shader.

Textures are commonly used to store images or apply surface details to 3D objects.  Each texture in WebGL is stored as a 2D array of color values with up to 4 components per color.

Uploading data to textures follows a similar pattern as buffers.  At a high level, we have the following steps:

1. First, we need to create a texture object
1. Then we bind it
1. Then we send data to it and configure it

# Texture Creation

Creating a texture is easy enough, we just use the following command:

```javascript
var texture = gl.createTexture()
```

Like buffers, textures are not garbage collected, so you should also release your texture when you are done with the `gl.deleteTexture()` command:

```javascript
//Call this when you are done with a texture
gl.deleteTexture(texture)
```

# Binding Textures

Once we have created a texture, we can then bind it to the current texture unit like so:

```javascript
gl.bindTexture(gl.TEXTURE_2D, texture)
```

# Setting Options

After the texture is bound, we can then configure various options on the texture using the `gl.texParameteri` and `gl.texParameterf` commands. We will come back to these in the next lesson, but for now you should use the following two commands to turn off filtering on the texture:

```javascript
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
```

# Uploading Image Data

Finally, we can upload image data into the texture.  This is done by calling `gl.texImage2D`.  This function is pretty complicated, but at a high level it just takes a flattened array of pixels and stores it into the texture:

```javascript
//Create a 2x2 black and white checkerboard
// Pixels are in RGBA order:
//  
//  +------+------+
//  | RGBA | RGBA |
//  +------+------+
//  | RGBA | RGBA |
//  +------+------+
//
var pixels = new Uint8Array([
  1,1,1,1,     0,0,0,1,   //First row of image
  0,0,0,1,     1,1,1,1    //Second row of image
])

//Upload image to the GPU
gl.texImage2D(
  gl.TEXTURE_2D,    //The current texture unit
  0,                //Miplevel (more on this later)
  gl.RGBA,          //Internal texture format
  2,                //Width of texture in pixels
  2,                //Height of texture in pixels
  0,                //Ignore this parameter, must be 0
  gl.RGBA,          //Type of input array
  gl.UNSIGNED_BYTE, //Storage format of pixel data
  pixels)           //Pixel data
```
