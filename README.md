webgl-workshop
==============

This is the sequel to shader-school.  The goal is to teach the basic WebGL API by breaking it down into manageable chunks.  Here is a sketch of how this could work:

1.  WebGL context creation
  1.  clear color
  1.  Viewport
  1.  Scissor
1.  Shaders
  1.  Shader objects (have student create vert/frag shaders)
  1.  Program objects (have student link shader)
  1.  Binding shaders
  1.  Uniforms
  1.  Constant attributes & attribute locations
1.  Buffers
  1.  Basic buffer creation
  1.  Attribute pointers
  1.  drawArrays
  1.  Element buffers and drawElements
1. Putting it all together
  1. Draw a triangle from start to finish
  1. Depth buffering and 3D graphics
  1. Animation
1.  Textures
  1. 2D textures
  1. Cube maps
1.  Framebuffer objects
  1. Render buffers
  1. Frame buffer basics
  1. Feedback loop
1.  Advanced drawing
  1.  Line width
  1.  Face culling
  1.  Back face/front face variables
  1.  Polygon offset
  1.  Reading pixels
  1.  Blending
  1.  Stencil buffer
1.  Extensions
  1. Vertex array objects
  1. Float textures
  1. Instanced arrays
  1. Multiple draw buffers
  1. Context loss

## Other Resources

* [WebGL Quick Reference Card](https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf)

## Development

Requires [npm](http://npmjs.org/) `2.x.x`.

``` bash
git clone git@github.com:hughsk/workshop-app-shell.git
cd workshop-app-shell
npm install
npm start
```

### Running the Server

``` bash
npm start
```

### Building the App

``` bash
make clean build
```

### Writing a New Exercise

In this project, each exercise is treated as an *independent* package, i.e. a
directory with its own `package.json` file, dependencies and so on. You're also
given almost full control with your exercise – it's essentially just a vanilla
route handler. See the [`exercises`](exercises) directory for a few existing
examples.

The steps are as follows:

1. Create a new directory in `exercises`. The name of this directory is not
   important.
1. Place a `package.json` file in there, with `main` pointing to `server.js` and
   the `name` being `@exercise/my-exercise-name`. This name will be used across
   the app to refer to the exercise in question (feel free to change that last
   part as you wish).
1. Copy `exercises/bare/server.js` into your new exercise directory.
1. Add an entry to `exercises.json`, where the key should be the exercise name
   as it appears on the menu and the value should be the same `name` property
   used in your `package.json`.
1. Run `npm install --save exercises/*` from the project root to update the
   exercise dependencies.

Next time you run the server you should be good to go!
