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

function compare(solution, submission, opts) {
  opts = opts || {}

  var threshold = opts.threshold || 0
  var args = [gl].concat(opts.args || [])
  var init = opts.init || passthrough
  var draw = opts.draw || passthrough

  clear(gl)
  reset()
  solution.init && init(gl, solution.init)
  solution.draw && draw(gl, solution.draw)
  var solutionPixels = pixels(gl)

  clear(gl)
  reset()
  submission.init && init(gl, submission.init)
  submission.draw && draw(gl, submission.draw)
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

function passthrough(gl, fn) {
  return fn.call(gl, gl)
}
