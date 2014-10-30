webgl-workshop
==============

*Currently a work in progress – this'll be ready to use around Halloween for
[CampJS](http://campjs.com) but until then please feel free to poke around and
provide feedback if you're interested.*

This is the sequel to shader-school.  The goal is to teach the basic WebGL API by breaking it down into manageable chunks.

## Installation

For now, install globally from GitHub using npm:

``` bash
[sudo] npm install -g stackgl/webgl-workshop
webgl-workshop
```

This will give you a `webgl-workshop` CLI tool, which when running will
boot up the workshop for you.

## Other Resources

There are also local copies of the following documentation available in the
[docs](docs/) directory in this repository.

* [WebGL Quick Reference Card](https://www.khronos.org/files/webgl/webgl-reference-card-1_0.pdf)

## Screenshots

![screenshot](http://i.imgur.com/Bd6c9LL.png)

![screenshot](http://i.imgur.com/FJLt56E.jpg)

![screenshot](http://i.imgur.com/oIsbh9D.jpg)

![screenshot](http://i.imgur.com/9tt3GSv.png)

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

### Lesson Plan

1. Basic WebGL
  1.  Context creation
  1.  clear color
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
1. First challenge
  1. Draw a triangle from start to finish
1.  Textures
  1. 2D textures
  1. Mipmaps and filtering
  1. Wrapping modes
  1. Multitexturing
1.  3D considerations
  1. Depth buffer
  1. Viewport and clip coordinates
  1. Face culling
  1. Back and front face variables
1. Second challenge:
  1. Draw a 3D textured mesh
1.  Framebuffer objects
  1. Render buffers
  1. Frame buffer basics
  1. Feedback loop
1. Blending
1. Stencil buffer
  1. basic usage
  1. shadows?
1. Advanced buffer tricks
  1. copyTexImage
  1. Color mask, depth mask, stencil mask
  1. depth func
  1. Reading pixels
1.  Advanced drawing tricks
  1.  Line width
  1.  Polygon offset
1.  Extensions
  1. Vertex array objects
  1. Float textures
  1. Instanced arrays
  1. Multiple draw buffers
  1. Context loss
