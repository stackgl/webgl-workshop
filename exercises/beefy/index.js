var exercise = require('@workshop/exercise')(require('./package.json').name)
var domify   = require('domify')

var pre = document.body.appendChild(document.createElement('pre'))

update()
function update() {
  pre.innerHTML = 'passed: ' + JSON.stringify(exercise.passed)
}

var button1 = domify('<button>Click me to Pass!</button>')
var button2 = domify('<button>Click me to... Unpass?</button>')

button1.addEventListener('click', function() {
  exercise.attempt(true)
  update()
}, false)

button2.addEventListener('click', function() {
  exercise.passed = false
  update()
}, false)

document.body.appendChild(button1)
document.body.appendChild(button2)
