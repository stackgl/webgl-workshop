var findup    = require('findup-element')
var fonts     = require('google-fonts')
var css       = require('defaultcss')
var minstache = require('minstache')
var inherits  = require('inherits')
var Emitter   = require('events/')
var domify    = require('domify')
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

  fonts.add({ 'Inconsolata': true })
  css(null, fs.readFileSync(__dirname + '/bundle.css', 'utf8'))

  this.el = document.body.appendChild(
    domify(template(this))
  )

  this.submission = this.el.querySelector('.submission-preview-wrap')
  this.solution = this.el.querySelector('.solution-preview')
  this.content = this.el.querySelector('.eui-content')
  this.el.addEventListener('click', function(e) {
    var button = findup(e.target, function(el) {
      if (!el.parentNode) return
      if (!el.parentNode.classList) return
      if (!el.parentNode.classList.contains('eui-icons')) return
      if (el.nodeName !== 'LI') return
      return true
    })

    if (!button) return
    self.emit(button.title)
  }, false)
}
