var highlight  = require('highlight.js').highlight
var eui        = require('@workshop/exercise-ui')
var fonts      = require('google-fonts')
var escape     = require('escape-html')
var fit        = require('canvas-fit')
var getCompare = require('gl-compare')
var getContext = require('gl-context')
var quotemeta  = require('quotemeta')
var cheerio    = require('cheerio')
var glapi      = require('gl-api')
var marked     = require('marked')
var glsldoc    = require('glsldoc')
var assert     = require('assert')
var path       = require('path')
var noop       = (function(){})

module.exports = common

var types = {}
var exps  = glsldoc.map(function(node) {
  types[node.name] = node.description.replace(/\"/g, '&quot;')
  return quotemeta(node.name)
}).join('|')

var typeExps = new RegExp('([^a-zA-Z_]|^)('+exps+')([^a-zA-Z_]|$)', 'g')

var methods = {}
var methodExps = glapi.map(function(node) {
  methods[node.name.slice(3)] = escape(node.description)
  return quotemeta(node.name.slice(3))
}).join('|')

methodExps = new RegExp('(gl\.)('+methodExps+')(\\()', 'g')

var markedOpts = {
  highlight: function(code, lang) {
    if (!(lang = lang.trim())) return code

    code = highlight(lang, code).value
    if (lang === 'glsl') {
      code = annotateGLSL(code)
    } else
    if (lang === 'js' || lang === 'javascript') {
      code = annotateJS(code)
    }

    return code
  }
}

function common(opts) {
  var overlay = document.createElement('div')
  var ui = eui()

  console.log('Submission File:', opts.file)

  overlay.style.position = 'absolute'
  overlay.style.top = overlay.style.bottom =
  overlay.style.left = overlay.style.right = 0
  overlay.style.background = '#34363B'
  overlay.style.zIndex = 99999
  overlay.style.opacity = 1
  overlay.style.transition = 'opacity 0.5s'

  document.body.appendChild(overlay)
  document.body.style.margin = 0
  document.body.style.padding = 0

  assert(opts.test, '@workshop/common: .test is missing')
  assert(opts.canvas, '@workshop/common: .canvas is missing')
  assert(opts.solution, '@workshop/common: .solution is missing')
  assert(opts.submission, '@workshop/common: .submission is missing')

  document.title = opts.title

  if (opts.title) {
    ui.header.innerHTML = escape(opts.title)
  }

  var glSub = getContext(opts.canvas, renderSub)
  var glSol = getContext(ui.solution, renderSol)
  var sol   = opts.solution
  var sub   = opts.submission
  var draw  = opts.draw || passthrough
  var init  = opts.init || passthrough

  sol.gl = glSol
  sub.gl = glSub

  ;[sub, sol].forEach(function(s) {
    s.init && init(s.gl, s.init)
    s.draw = s.draw || noop
  })

  var analytics = require('./analytics')({
      ui: ui
    , exercise: opts.exercise
  })

  ui.input.value = opts.file
  ui.submission.appendChild(opts.canvas)
  ui.content.innerHTML = marked(opts.readme || '', markedOpts)
  ui.on('test', function() {
    opts.test(function(err, passed) {
      opts.exercise.attempt(passed)
      ui.matchMessage(passed
        ? 'Passed, nice work!'
        : 'Nope! Try Again?', passed
      )

      analytics()('send', {
          hitType: 'event'
        , eventCategory: 'Exercise Attempts'
        , eventAction: passed ? 'Passed' : 'Failed'
      })

      if (err) throw err
    })
  })

  window.addEventListener('load'
    , fit(opts.canvas, ui.submission)
    , false
  )

  function renderSol() {
    draw(glSol, sol.draw)
  }

  function renderSub() {
    draw(glSub, sub.draw)
  }

  setTimeout(function() {
    overlay.style.opacity = 0
    setTimeout(function() {
      document.body.removeChild(overlay)
      overlay = null
    }, 500)
  }, 250)

  return {
    submission: sub
    , solution: sol
  }
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

function annotateJS(code) {
  code = cheerio.load(code)
  code.root().contents().map(function(_, el) {
    el = code(el)

    var html = el.html()
    var text = el.text()
    if (html && html !== text) return
    var updated = false

    text = text.replace(methodExps, function(_, pre, method, post) {
      updated = true
      return pre+'<span class="def" title="'+methods[method]+'">'+method+'</span>'+post
    })

    if (updated) {
      el.html('<span>'+text+'</span>')
      el[0].type = 'tag'
    }
  })

  return code.html()
}

function passthrough(gl, fn) {
  return fn.call(gl, gl)
}
