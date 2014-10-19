var highlight  = require('highlight.js').highlight
var eui        = require('@workshop/exercise-ui')
var fonts      = require('google-fonts')
var getCompare = require('gl-compare')
var getContext = require('gl-context')
var quotemeta  = require('quotemeta')
var cheerio    = require('cheerio')
var marked     = require('marked')
var glsldoc    = require('glsldoc')
var assert     = require('assert')
var noop       = (function(){})

module.exports = common

var types = {}
var exps  = glsldoc.map(function(node) {
  types[node.name] = node.description.replace(/\"/g, '&quot;')
  return quotemeta(node.name)
}).join('|')

var typeExps = new RegExp('([^a-zA-Z_]|^)('+exps+')([^a-zA-Z_]|$)', 'g')

var markedOpts = {
  highlight: function(code, lang) {
    if (!(lang = lang.trim())) return code

    code = highlight(lang, code).value
    if (lang === 'glsl') {
      code = annotateGLSL(code)
    }

    return code
  }
}

function common(opts) {
  var overlay = document.createElement('div')
  var ui = eui()

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
  var sol     = opts.solution
  var sub     = opts.submission

  ;[sub, sol].forEach(function(s) {
    s.init && s.init(gl)
    s.draw = s.draw || noop
  })

  compare.mode = 'slide'
  compare.amount = 0.5

  ui.content.innerHTML = marked(opts.readme || '', markedOpts)
  ui.on('test', function() {
    opts.test(function(err, passed) {
      opts.exercise.attempt(passed)
      if (err) throw err
      console.log('attempted:', passed)
    })
  })

  function render() {
    compare.run()
    compare.render()
  }

  // TODO: use multiple gl contexts
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

  return gl
}

function annotateGLSL(code) {
  code = cheerio.load(code)
  code('span').map(function(_, el) {
    el = code(el)
    if (el.html() !== el.text()) return

    el.html(el.text().replace(typeExps, function(_, pre, type, post) {
      return pre+'<span class="def" title="'+types[type]+'">'+type+'</span>'+post
    }))
  })

  return code.html()
}
