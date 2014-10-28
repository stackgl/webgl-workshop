# Clearing the depth buffer

## Exercise

For this exercise you should set the clear depth to `0.65` and then clear the depth buffer.

## Clearing the depth buffer

Like the color buffer, the drawing buffer can also be cleared.  Instead of using `gl.clearColor`, to set the value of the depth buffer you do:

```javascript
gl.clearDepth(depthValue)
```

Where `depthValue` is the value to clear the depth buffer to.  The default depth is `0.0`