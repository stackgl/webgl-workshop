var beefy = require('beefy')
var brfs  = require('brfs')

module.exports = createServer

function createServer(answersDirectory) {
  var brfs = ['-t', require.resolve('brfs')]

  return beefy({
      cwd: __dirname
    , entries: ['index.js']
    , quiet: false
    , live: false
    , debug: false
    , watchify: false
    , bundlerFlags: []
      .concat(brfs)
  })
}
