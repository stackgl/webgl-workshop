var Exercise  = require('@workshop/exercise')
var sidenote  = require('sidenote')
var findup    = require('./findup')
var exercises = require(findup(__dirname))
var menu      = require('browser-menu')({
    x: 0, y: 0
  , bg: process.browser ? '#FFE169' : 'green'
  , fg: process.browser ? '#34363B' : 'black'
})

var  name = 'WebGL Workshop'
var  line = '---------------------------------------------'
var _line = line

menu.reset()
menu.write('<strong>'+name.toUpperCase()+'</strong>\n')
menu.element.style.margin = '2em'

var keys = Object.keys(exercises)
var lcat = null
var cats = []
var isComplete = '[COMPLETE]'
var unComplete = '          '

var rows = sidenote(keys.map(function(name, i) {
  var dir      = exercises[name]
  var parts    = name.match(/^(.*?)([A-Z][^\:]+\:)(.*?)$/)
  var category = cats[i] = parts[2].slice(0, -1)

  var newname = parts
    .slice(1, 2)
    .concat(parts.slice(3))
    .join('')
    .replace(/\s+/, ' ')

  exercises[newname] = exercises[name]

  return [ newname, Exercise(dir).passed
    ? isComplete
    : unComplete
  ]
}), {
    distance: 31
  , character: ' '
}).map(function(row, i) {
  // write new categories
  var cat = cats[i]
  if (cat !== lcat) {
    var line = '- <span><span>' + cat + '</span></span> ' + _line.slice(cat.length)
    menu.write(line + '\n')
    lcat = cat
  }

  // and then add the row afterwards
  menu.add(row)
  return row
})

var selected = false

menu.on('select', function(_, i) {
  var label = keys[i]
  if (!exercises[label]) return console.error('exercise does not exist: '+label)
  if (selected) return; selected = true

  document.body.classList.add('exiting')
  setTimeout(function() {
    window.location = '/'+exercises[label]
  }, 350)
})

setTimeout(function() {
  document.body.classList.add('ready')
})

var analytics = document.querySelector('.analytics-toggle')

console.log(updateAnalytics())

function updateAnalytics() {
  var value = localStorage.getItem('webgl-workshop-analytics-disable')

  analytics.innerHTML = value
    ? 'Enable Analytics'
    : 'Disable Analytics'

}

analytics.addEventListener('click', function(e) {
  localStorage.setItem('webgl-workshop-analytics-disable'
    , !localStorage.getItem('webgl-workshop-analytics-disable') ? 'true' : '')
  updateAnalytics()
  e.preventDefault()
  e.stopPropagation()
  return false
}, false)
