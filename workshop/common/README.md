# @workshop/common

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
