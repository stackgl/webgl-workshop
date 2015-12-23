# Exercise

For this exercise, you should take the above steps which we outlined and compile/link a simple program object.  The source code for this program has been provided for you as well as a stub function for drawing a triangle (don't worry about the details of this for now).  Once you have everything working, hit submit and go on to the next lesson!

# GLSL and You

**Note:** though it's not compulsory, it's useful to have an understanding of
the basics of [GLSL](http://en.wikipedia.org/wiki/OpenGL_Shading_Language) for
this section. If you're keen to learn more, working through the first few
lessons of [shader-school](http://github.com/stackgl/shader-school) should
get you up to speed.

# Creating Shaders

In WebGL, objects are rendered in parallel using programs called shaders, which are written in a high level language called GLSL.  GLSL programs need to be uploaded to the WebGL driver, compiled and linked before they can be run. In this lesson, we are going to walk through how to do this using the WebGL API.

### Shader Objects

Recall that shaders come in two different types:  fragment shaders and vertex shaders.  The source code for these shaders are represented in WebGL by "shader objects".  To create a shader object (either a vertex or fragment shader), we use the following command:

```javascript
//Create a fragment shader
var fragShader = gl.createShader(gl.FRAGMENT_SHADER)

//Create a vertex shader
var vertShader = gl.createShader(gl.VERTEX_SHADER)
```

## `gl.createShader(type)`
> Creates a shader object of the given type.  type must be either `gl.FRAGMENT_SHADER` or `gl.VERTEX_SHADER`

Once we have created a shader, we can upload the source code to WebGL using the following command:

```javascript
gl.shaderSource(shader, "\
void main() {\
  gl_FragColor = vec4(1,0,0,1);\
}")
```

## `gl.shaderSource(shader, source)`
> Sets the source code of `shader` to the string `source`.  `shader` must be a shader object, created using `gl.createShader` and `source` is a string storing the raw GLSL source code of the shader.

After uploading the source code, we then need to tell WebGL to compile the shader for us:

```javascript
gl.compileShader(shader)
```

## `gl.compileShader(shader)`
> Compiles the GLSL source code of a shader object after it has been uploaded.

It is also a good idea to check for errors after compilation, as `gl.compileShader()` does not throw any exceptions or errors by default.  To see if anything went wrong, we can check the compile status and any compiler output with the following pair of commands:

```javascript
if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
  console.error("Error compiling shader:", gl.getShaderInfoLog(shader))
}
```

## `gl.getShaderParameter(shader, pname)`
> Reads the parameter `pname` from shader.  `pname` must be one of:
* `gl.SHADER_TYPE` returns either `gl.FRAGMENT_SHADER` or `gl.VERTEX_SHADER`
* `gl.DELETE_STATUS` returns true if shader deleted
* `gl.COMPILE_STATUS` returns false if there was an error compiling the shader

## `gl.getShaderInfoLog(shader)`
> Returns a log of error messages created when compiling the shader in string format.

# Program Objects

Compiling a shader object is only the first step to building a shader.  After you have a vertex and fragment shader object, you need to link them together into a single program object which can be used to draw things.  To create a program object, we use the following command:

```javascript
var program = gl.createProgram()
```

## `gl.createProgram()`
> Creates a new program object.

After this, we then need to attach the shader objects to the program:

```javascript
gl.attachShader(program, fragShader)
gl.attachShader(program, vertShader)
```

## `gl.attachShader(program, shader)`
> Attach the shader object, `shader`, to the program object, `program`

Once we have attached exactly a fragment shader and a vertex shader to a program, we can finally link it using the command:

```javascript
gl.linkProgram(program)
```

## `gl.linkProgram(program)`
> Links a program object.

Again, it is useful to check that linking the program was successful, or if it failed report any errors that happened along the way:

```javascript
if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error('Error linking program:', gl.getProgramInfoLog(program))
}
```

## `gl.getProgramParameter(program, pname)`
> Retrieves the parameter `pname` from the program, `program`.  Some possible values for `pname` include:
* `gl.LINK_STATUS` checks if the program linked successfully
* `gl.DELETE_STATUS` checks if the program has been deleted

# Using Program Objects

Finally after we have compiled and linked a program object we can use it to draw things.  Fortunately doing this is pretty simple (compared to all of the above set up).  It only requires one command:

```javascript
gl.useProgram(program)
```

## `gl.useProgram(program)`
> Tells WebGL to use the shader program `program` for all subsequent drawing operations.

There is no need to turn off a shader in WebGL.  Before you start drawing, you should bind an appropriate shader, and then when you are ready to draw the next thing just bind the next shader and continue.

# Miscellaneous details

Program and shader objects in WebGL are not garbage collected as the WebGL context keeps a handle on them internally.  So if you are done with a shader and want to release all the resources associated with it you need to remember to delete it.  This can be done using the following commands:

## `gl.deleteShader(shader)`
> Destroys a shader object

## `gl.deleteProgram(program)`
> Destroys a program

Remembering to release resources when you are done with them is good practice in WebGL.  While this is not as important an issue with shaders, later on when we come to bigger data structures (like buffers and textures) it will become more important to manage our memory carefully.
