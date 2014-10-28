var Exercise   = require('@workshop/exercise')
var compare    = require('@workshop/compare')
var fresh      = require('fresh-require')
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
  , title: 'Hello, WebGL'
  , test: function(done) {
    // >=99% of pixels should be no more than 5 units in difference.
    return done(null, compare(
        fresh('./solution')
      , fresh(process.env.file_index_js)
    , 5) >= 0.99)
  }
})
