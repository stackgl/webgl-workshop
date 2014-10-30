# Challenge

In this challenge, we move now from drawing a single triangle to drawing a textured spinning 3D cube.  The vertices of the cube and the UV texture coordinates are provided for you, along with a texture that should be applied to each face.  A camera matrix mapping the vertices from the initial coordinate frame to the result is provided for you.  It is up to you to do all of the rest.

A few notes:

* You must use mipmapping on the texture for minification
* When computing the vertex position in your shader use:

```glsl
gl_Position = camera * vec4(vertexPosition, 1);
```

* The format of the vertices of the cube is:

```javascript
position_x, position_y, position_z, texture_s, texture_t
```

* The faces of the cube are given as triangles and stored in an array of element indices.