var readdirp  = require('fs-readdir-recursive')
var copyMods  = require('./copy-modules')
var Menu      = require('@workshop/menu')
var opener    = require('opener')
var findup    = require('findup')
var resolve   = require('resolve')
var mkdirp    = require('mkdirp')
var http      = require('http')
var path      = require('path')
var url       = require('url')
var fs        = require('fs')

var root = findup.sync(__dirname, 'exercises.json')
var exercises = require(path.join(root, 'exercises.json'))
var node_modules = path.join(root, 'node_modules')

module.exports = createServer

function createServer(config, done) {
  config.answers = config.answers || path.join(process.cwd(), 'answers')

  var PORT = 14921
  var menu = Menu()
  var handlers = getHandlers(
      exercises
    , config.answers
  )

  return http.createServer()
    .on('request', request)
    .listen(14921, function(err) {
      if (err) return done(err)

      copyMods(node_modules, config.answers, function(err) {
        return done(err, 'http://localhost:'+PORT)
      })
    })

  function request(req, res) {
    var pathname = url.parse(req.url).pathname
    var keys = Object.keys(handlers)

    // Route exercises by their package names,
    // e.g. the "@exercise/beefy" package can be found
    // at "/@exercise/beefy".
    for (var i = 0; i < keys.length; i++) {
      var uri = keys[i]
      var idx = pathname.indexOf(uri)
      if (idx !== 0) continue
      if (pathname === uri) {
        res.statusCode = 302
        res.setHeader('location', pathname + '/')
        return res.end()
      }

      req.url = req.url.replace(uri, '')
      if (req.url.charAt(0) !== '/') {
        req.url = '/' + req.url
      }

      if (req.url === '/_open/solution') {
        return openSolution(req, res, uri.slice(1))
      }

      if (req.url === '/_open/submission') {
        return openSubmission(req, res, uri.slice(1), config.answers)
      }

      return handlers[uri](req, res)
    }

    // Fall back to the menu server.
    return menu(req, res)
  }
}

function getHandlers(exercises, answers) {
  return Object.keys(exercises).reduce(function(packages, name) {
    var target = exercises[name]
    var Router = require(target)
    var pkg    = require(target + '/package.json')
    var uri    = target // pkg.url
    var dst    = path.join(answers, uri.replace('@exercise', ''))

    mkdirp.sync(dst)
    uri = '/' + uri
    if (packages[uri]) throw new Error('Duplicate exercise URL: ' + uri)
    packages[uri] = Router(dst)

    return packages
  }, {})
}

function openSolution(req, res, exercise) {
  var root = path.dirname(require.resolve(exercise + '/package.json'))
  var open = path.join(root, 'solution')
  opener(open)
  res.end()
}

function openSubmission(req, res, exercise, answers) {
  var open = path.join(answers, exercise.replace(/^\@.*?\//, ''))
  opener(open)
  res.end()
}
