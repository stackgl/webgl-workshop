var inherits = require('inherits')
var Emitter  = require('events/')

module.exports = Exercise

inherits(Exercise, Emitter)
function Exercise(slug) {
  if (!(this instanceof Exercise)) return new Exercise(slug)
  Emitter.call(this)

  this.slug = slug
  this.storageId = ['exercises', this.slug].join(':')
}

Object.defineProperty(Exercise.prototype, 'passed', {
  get: function() {
    var value = JSON.parse(localStorage.getItem(this.storageId))
    return !!(value && value.value)
  },
  set: function(value) {
    value = JSON.stringify({ value: !!value })
    return localStorage.setItem(this.storageId, value)
  }
})

Exercise.prototype.attempt = function(value) {
  this.passed = value || this.passed
  this.emit('attempt', value)
}
