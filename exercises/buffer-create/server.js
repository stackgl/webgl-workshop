var envify = require('@workshop/envify-files')
var beefy  = require('beefy')
var path   = require('path')
var fs     = require('fs')

module.exports = createServer

function createServer(answersDirectory) {
  var answersTemplate = path.join(__dirname, 'submission')
  var brfs = ['-t', require.resolve('brfs')]

  return beefy({
      cwd: __dirname
    , entries: ['index.js']
    , quiet: false
    , live: false
    , debug: false
    , watchify: false
    , bundlerFlags: []
      .concat(envify(answersTemplate, answersDirectory))
      .concat(brfs)
  })
}
