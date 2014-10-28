# Exercise

For this exercise, you should use uniform values to draw a triangle at a handful of different configurations.  This time you are provided with some code for creating a shader program and for drawing a triangle.

The shader program exposes the following uniforms:

* `scale` - a `float`
* `offset` - a `vec2`
* `color` - a `vec3`

You should draw 4 triangles with the following permutations of the uniform values in the following order:

1. `scale=0.15, offset=[-0.5,-0.5], color=[1, 0, 0]`
2. `scale=0.25, offset=[0.5,-0.5], color=[0, 1, 0]`
3. `scale=0.5, offset=[0.1,0.3], color=[0, 0, 1]`
4. `scale=0.3, offset=[0.3,-0.4], color=[1, 1, 0]`

# Uniform Variables

If you've done the shader-school exercises, then you should have learned about uniform variables.  Uniforms are variables which are set from WebGL and broadcast out to all executions of a shader program.  In this exercise we are going to learn how to set uniform variables from WebGL. At a high level, there are two steps to this process:

1. Getting the location of the uniform
2. Setting the value of the uniform

For example, suppose that we have the following fragment shader:

```glsl
precision mediump float;

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1);
}
```

And that this fragment shader is compiled and linked to a program object which we shall call `program`.  Then to get the location of the uniform variable `color`, we use the following command in WebGL:

```javascript
var colorLocation = gl.getUniformLocation(program, 'color')
```

This command has the following meaning:

## `gl.getUniformLocation(program, name)`
> Retrieves the location of the uniform named `name` from `program`, where `name` is a string.

Once you have a uniform location, you can set the value of the uniform **after you have bound the shader** using one of the `gl.uniform` commands.  For example:

```javascript
gl.uniform3f(colorLocation, 1, 0, 1)  //Set color to magenta
```

Or equivalently you can use the `v` variant which lets you pass an array:

```javascript
gl.uniform3fv(colorLocation, [1,0,1])
```

There are 16 different `uniform` commands, but they are all variations on the same basic idea:

## `gl.uniform[1234][fi]?v(location, value)`
> Sets the value of a uniform.  The number `1234` determines the dimension of the vector which is being set.  For example, `gl.uniform2f` sets the value of a `vec2`, while `gl.uniform3f` sets a `vec3`.  `i` or `f` determines whether the uniform is an integer or a float.  `v` determines whether the arguments are passed in individually or using an array.

There is also a special command for updating matrix uniforms:

## `gl.uniformMatrix[234]fv(location, transpose, value)`
> Updates a matrix uniform.  `transpose` is a flag which if set flips the matrix.  `value` is the components of the matrix listed in column major order.

The different permutations (excluding array arguments) can be summarized in the following list:

* Command - GLSL type
* `gl.uniform1f` - `float`
* `gl.uniform2f` - `vec2`
* `gl.uniform3f` - `vec3`
* `gl.uniform4f` - `vec4`
* `gl.uniform1i` - `int`  (Or `sampler2d`/`samplerCube` -- more on this later)
* `gl.uniform2i` - `ivec2`
* `gl.uniform3i` - `ivec3`
* `gl.uniform4i` - `ivec4`
* `gl.uniformMatrix2fv` - `mat2`
* `gl.uniformMatrix3fv` - `mat3`
* `gl.uniformMatrix4fv` - `mat4`
