var Exercise   = require('@workshop/exercise')
var fit        = require('canvas-fit')
var fs         = require('fs')

// Things for plugging into
var canvas   = document.body.appendChild(document.createElement('canvas'))
var readme   = fs.readFileSync(__dirname + '/README.md', 'utf8')
var exercise = Exercise(require('./package.json').name)

// Load user submission and the finished solution
var solution   = require('./solution')
var submission = require(process.env.file_index_js)

// Rescale canvas to screen
window.addEventListener('resize'
  , fit(canvas)
  , false
)

var gl = require('@workshop/common')({
    canvas: canvas
  , readme: readme
  , exercise: exercise
  , solution: solution
  , submission: submission
  , title: 'Texture Creation'
  , test: function(done) {
    return done(null, true)
  }
})
