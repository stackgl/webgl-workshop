/**
 * Compares two init/draw pairs on an offscreen 200*200
 * canvas. The canvas is instrumented with gl-reset in
 * order to prevent state from leaking out and minimise
 * the risk of memory leaks.
 */
var canvas = document.createElement('canvas')
var gl     = require('gl-context')(canvas)
var pixels = require('canvas-pixels')
var reset  = require('gl-reset')(gl)
var clear  = require('gl-clear')({
    depth: true
  , color: true
  , stencil: true
})

canvas.width  = 200
canvas.height = 200

var total = 200 * 200

module.exports = compare

function compare(solution, submission, threshold) {
  threshold = threshold || 0

  clear(gl)
  reset()
  solution.init && solution.init(gl)
  solution.draw && solution.draw(gl)
  var solutionPixels = pixels(gl)

  clear(gl)
  reset()
  submission.init && submission.init(gl)
  submission.draw && submission.draw(gl)
  var submissionPixels = pixels(gl)

  var invalid = 0

  for (var i = 0; i < submissionPixels.length; i++) {
    if (
      + abs(solutionPixels[i] - submissionPixels[i++])
      + abs(solutionPixels[i] - submissionPixels[i++])
      + abs(solutionPixels[i] - submissionPixels[i++])
      > threshold
    ) invalid++
  }

  return 1 - invalid / total
}

function abs(n) {
  return n > 0 ? n : -n
}
