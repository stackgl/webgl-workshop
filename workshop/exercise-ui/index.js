var findup    = require('findup-element')
var escape    = require('escape-html')
var css       = require('defaultcss')
var mousetrap = require('mousetrap')
var minstache = require('minstache')
var inherits  = require('inherits')
var Emitter   = require('events/')
var domify    = require('domify')
var xhr       = require('xhr')
var fs        = require('fs')

var template  = minstache.compile(
  fs.readFileSync(__dirname + '/ui.html', 'utf8')
)

module.exports = ExerciseUI

inherits(ExerciseUI, Emitter)
function ExerciseUI() {
  if (!(this instanceof ExerciseUI)) return new ExerciseUI
  Emitter.call(this)

  var self = this

  css(null, fs.readFileSync(__dirname + '/bundle.css', 'utf8'))

  this.tooltip = document.createElement('div')
  this.tooltip.classList.add('eui-tooltip')

  this.el = document.body.appendChild(
    domify(template(this))
  )

  mousetrap.bind([
      'command+enter'
    , 'alt+enter'
    , 'ctrl+enter'
  ], function() {
    self.emit('test')
  })

  mousetrap.bind([
      'command+o'
    , 'ctrl+o'
  ], function(e) {
    self.emit('edit')
    e.preventDefault()
    e.stopPropagation()
    return false
  })

  this.submission = this.el.querySelector('.submission-preview-wrap')
  this.solution = this.el.querySelector('.solution-preview')
  this.reporter = this.el.querySelector('.eui-reporter')
  this.content = this.el.querySelector('.eui-content')
  this.header = this.el.querySelector('.eui-title')
  this.input = this.el.querySelector('.eui-path')
  this.el.addEventListener('click', function(e) {
    var button = getButton(e.target)
    if (!button) return
    self.emit(button.title)
  }, false)

  this.el.addEventListener('mouseover', function(e) {
    var button = getButton(e.target)
    if (!button) return
    document.body.appendChild(self.tooltip)
    self.tooltip.innerHTML = escape(button.title)

    var bounds = button.getBoundingClientRect()
    var left   = bounds.left + bounds.width / 2
    var top    = bounds.top + bounds.height

    self.tooltip.style.left = left + 'px'
    self.tooltip.style.top  = top + 'px'
  }, false)

  this.el.addEventListener('mouseout', function(e) {
    var button = getButton(e.target)
    if (!button) return
    if (self.tooltip.parentNode) {
      document.body.removeChild(self.tooltip)
    }
  }, false)

  this.on('home', function() {
    window.location = '/'
  })

  this.on('edit', function() {
    get('_open/submission')
  })

  this.on('view solution', function() {
    get('_open/solution')
  })
}

var n = 0
ExerciseUI.prototype.matchMessage = function(msg, passed) {
  var m = ++n
  var classes = this.el.classList
  this.reporter.innerHTML = escape(msg)
  if (!classes.contains('eui-matched')) {
    classes.add('eui-matched')
  }

  classes.remove(passed
    ? 'eui-matched-failed'
    : 'eui-matched-passed'
  )
  classes.add(passed
    ? 'eui-matched-passed'
    : 'eui-matched-failed'
  )

  var self = this
  setTimeout(function() {
    if (m !== n) return
    classes.remove('eui-matched')
    classes.remove('eui-matched-failed')
    classes.remove('eui-matched-passed')
  }, 2500)
}

function get(uri) {
  xhr(uri, function(err, res, body) {
    if (err) throw err
  })
}

function getButton(src) {
  return findup(src, function(el) {
    if (!el.parentNode) return
    if (!el.parentNode.classList) return
    if (!el.parentNode.classList.contains('eui-icons')) return
    if (el.nodeName !== 'LI') return
    return true
  })
}
