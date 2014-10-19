# Context creation

The first thing to do to get WebGL up and running is to create a WebGL graphics context.  The way this works is similar to the 2D canvas API.

#### 1. Get a canvas element

This can be done using `document.querySelector` to find an existing canvas object, or by creating a new canvas element with `document.createElement`:

```javascript
var canvas = document.createElement('canvas')
```

#### 2. Create the WebGL context

Once we have a canvas element, we can then grab a WebGL context using the `getContext` method:

```javascript
var context = canvas.getContext('webgl')
```

On systems that don't support WebGL, creating a WebGL context can sometimes fail by throwing an exception, so it is good practice to wrap this in a try-catch block.  For example,

```javascript
var context
try {
  context = canvas.getContext('webgl')
} catch(e) {
  context = null
}
if(!context) {
  console.warn('WebGL not supported :(')
}
```

And that's pretty much it!

## Exercise

For this first exercise, just do the above steps to create a WebGL context.  To do this, you should create a JavaScript file called `context.js` in the exercise directory associated to this lesson.

```javascript
module.exports = function(canvas) {
  // Create a WebGL context and return it
  return null
}
```

Once that is working, click the submit button and move on to the next lesson!