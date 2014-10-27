# The Depth Buffer

## Exercise

For this exercise, you should enable `gl.DEPTH_TEST` and clear the depth buffer each frame so that the two triangles are drawn correctly.

## Depth culling

In order to draw 3d scenes correctly, it is necessary that objects which are closer to the camera occlude objects that are farther away.

One naive solution to this problem would be to sort all of the objects front-to-back and render them in order, however this approach would require careful synchronization and incur a heavy penalty each frame.

Instead, WebGL uses a much simpler mechanism to ensure that objects are rendered in the correct order called the *depth buffer*. The depth buffer is a 2D array with the same dimensions as the drawing buffer that stores the distance to the camera in clip coordinates. To use the depth buffer to render objects in 3D, you first have to turn on the depth test:

```javascript
gl.enable(gl.DEPTH_TEST)
```

If the depth test is turned on, then for each fragment that is drawn the position in the fragment (again in clip coordinates) is compared to the depth buffer value, and if it is closer then it gets rendered.

After drawing a frame, it is necessary to clear the depth buffer. This can be done by calling `gl.clear` with the `gl.DEPTH_BUFFER_BIT` flag:

```javascript
gl.clear(gl.DEPTH_BUFFER_BIT)
```

You can clear multiple buffers at once by combining flags together:

```javascript
//Clear color and depth buffer
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
```