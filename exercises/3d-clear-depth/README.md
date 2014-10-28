# Exercise

For this exercise you should set the clear depth to `0.65` and then clear the depth buffer.

# Clearing the Depth Buffer

Like the color buffer, the drawing buffer can also be cleared.  Instead of using `gl.clearColor`, to set the value of the depth buffer you do:

```javascript
gl.clearDepth(depthValue)
```

Where `depthValue` is the value to clear the depth buffer to.  The default depth is `0.0`.

# Buffer Bits

Remember `gl.COLOR_BUFFER_BIT`? You have to tell WebGL explicitly which buffer
to clear for it to do anything, and in the case of the depth buffer you should
use `gl.DEPTH_BUFFER_BIT` instead.

```javascript
// This tells WebGL to clear the color buffer:
gl.clear(gl.COLOR_BUFFER_BIT)

// Whereas the following will clear the depth buffer:
gl.clear(gl.DEPTH_BUFFER_BIT)

// You can do both at the same time too!
gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
```
