# Exercise

In this exercise we will see an advanced use of the stencil buffer, which is shadow rendering.

To help get you started, routines have been provided for drawing the mesh and for rendering the shadow volume.  Specifically, you are provided with the following two methods:

## `draw.mesh(t, intensity)`
Draws a mesh at time t with light intensity proportional to the floating point number `intensity`

## `draw.shadow(t)`
Draws the shadow volume at time t

What you should do for this exercise is render the regions of the mesh which do not intersect the shadow volume at intensity `1`, and the regions inside the shadow volume at intensity `0.1`.

# Stencil shadows

Stencil shadows provide pixel perfect crisp shadows, and faithfully handle self occlusion and interaction between complex geometries.  The disadvantage is that they only support point and directional light sources (which means no area lights or soft shadows).

Still, the effect is very pleasing relatively simple to implement.  The algorithm which we present here was discovered by John Carmack and implemented in the Doom 3 engine.  It has the advantage that it is very fast and robust to implement within hardware.

At a high level, the algorithm consists of the following steps:

1.  Render the mesh fully lit into the color and depth buffer with no stencil test.
2.  Turn off color and depth writes, then render the shadow volume into the buffer incrementing when back faces depth fail and decrementing when front faces depth pass.
3.  Render the shadowed mesh over top of the existing mesh wherever the stencil buffer is not equal to 0.

To convince yourself that this works, it is helpful to draw a picture.
