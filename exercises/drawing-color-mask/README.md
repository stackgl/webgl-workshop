# Exercise

For this exercise, draw only the green channel of the texture.

You are given a command which will draw a single texture to the screen.

# Color mask

In WebGL it possible to selectively render to only parts of the color buffer, or even none at all!  This technique can be useful when combined with other methods, like depth prepass rendering to reduce the overhead of fragment shader computations.

To turn on/off rendering to the color buffer, you can use the `gl.colorMask` command:

```javascript
gl.colorMask(red, green, blue, alpha)
```

This command accepts 4 boolean values, one for each of the color channels.  Setting a value to `false` turns off rendering for that color channel.  For example, to turn off alpha rendering you can do the following:

```javascript
gl.colorMask(true, true, true, false)
```