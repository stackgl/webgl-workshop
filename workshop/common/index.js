var fonts      = require('google-fonts')
var getSidebar = require('gl-compare-sidebar')
var getCompare = require('gl-compare')
var getContext = require('gl-context')
var marked     = require('marked')
var assert     = require('assert')
var noop       = (function(){})

module.exports = common

function common(opts) {
  var overlay = document.createElement('div')

  fonts.add({ 'Source Code Pro': [200, 600] })

  overlay.style.position = 'absolute'
  overlay.style.top = overlay.style.bottom =
  overlay.style.left = overlay.style.right = 0
  overlay.style.background = '#34363B'
  overlay.style.zIndex = 99999
  overlay.style.opacity = 1
  overlay.style.transition = 'opacity 0.25s'

  document.body.appendChild(overlay)
  document.body.style.margin = 0
  document.body.style.padding = 0

  assert(opts.test, '@workshop/common: .test is missing')
  assert(opts.canvas, '@workshop/common: .canvas is missing')
  assert(opts.solution, '@workshop/common: .solution is missing')
  assert(opts.submission, '@workshop/common: .submission is missing')

  var gl      = getContext(opts.canvas, render)
  var compare = getCompare(gl, actual, expected)
  var sidebar = getSidebar(compare)
  var sol     = opts.solution
  var sub     = opts.submission

  ;[sub, sol].forEach(function(s) {
    s.init && s.init(gl)
    s.draw = s.draw || noop
  })

  compare.mode = 'slide'
  compare.amount = 0.5

  sidebar.content.innerHTML = marked(opts.readme || '')
  sidebar.on('test', function() {
    opts.test(function(err, passed) {
      opts.exercise.attempt(passed)

      if (err) throw err
      if (passed) {
        sidebar.status = 'passed!'
        sidebar.statusColor = '#57FF8A'
      } else {
        sidebar.status = 'try again?'
        sidebar.statusColor = '#FF6E57'
      }
    })
  })

  function render() {
    compare.run()
    compare.render()
  }

  // TODO: override gl.bindFramebuffer to mask that
  // an FBO is being bound here
  function actual(fbo) {
    fbo.bind()
    sol.draw(gl)
  }

  function expected(fbo) {
    fbo.bind()
    sub.draw(gl)
  }

  setTimeout(function() {
    overlay.style.opacity = 0
    setTimeout(function() {
      document.body.removeChild(overlay)
      overlay = null
    }, 250)
  })
}
