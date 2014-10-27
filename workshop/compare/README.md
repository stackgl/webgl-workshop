# @workshop/compare

Compares two `init`/`draw` pairs on an offscreen 200*200 canvas. The canvas is
instrumented with `gl-reset` in order to prevent state from leaking out and
minimise the risk of memory leaks.

Returns a value between 0 and 1, where 1 is a complete match and 0 is a
complete failure.

Accepts the following options:

## opts.threshold

The maximum difference between two pixels before they're
considered to no longer be matching. This is the *total* difference between
the red, green, and blue channels and as such can range between 0 and 765.

## opts.init

Pass in a custom hook for handling the `init` function of each
submission/solution.

``` javascript
init: function(gl, initFn) {
  return initFn.call(gl, gl, imgElement)
}
```

## opts.draw

Pass in a custom hook for handling the `draw` function of each
submission/solution.

``` javascript
draw: function(gl, drawFn) {
  return drawFn.call(gl, gl, Date.now())
}
```

## Example

Pseudocode for checking an exercise at 10 random intervals over a period of
5 seconds:

``` javascript
var times  = [Date.now()]
var passed = true

for (var i = 0; i < 9; i++) {
  times.push(times[0] + Math.random() * 5000)
}

for (var i = 0; i < times.length; i++) {
  passed = passed && compare(submission, solution, {
      threshold: 5
    , draw: function(gl, drawFn) {
      return drawFn.call(gl, gl, times[i])
    }
  })
}

done(null, passed)
```
