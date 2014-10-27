/**
 * Reusable base server for exercises. Has all of the features
 * we would need to use in a typical lesson. If you need more/less
 * and it doesn't fit in with the rest, you should copy this and use
 * it as the base for your own.
 */
var envify = require('@workshop/envify-files')
var beefy  = require('beefy')
var path   = require('path')
var fs     = require('fs')

module.exports = BasicServer

function BasicServer(dirname) {
  return function createServer(answersDirectory) {
    var answersTemplate = path.join(dirname, 'submission')
    var brfs  = ['-t', require.resolve('brfs')]
    var fresh = ['-t', require.resolve('fresh-require/transform')]

    return beefy({
        cwd: dirname
      , entries: ['index.js']
      , quiet: false
      , live: false
      , debug: false
      , watchify: false
      , bundlerFlags: []
        .concat(envify(answersTemplate, answersDirectory))
        .concat(brfs)
        .concat(fresh)
    })
  }
}
