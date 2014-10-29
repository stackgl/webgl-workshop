/**
 * Reusable base server for exercises. Has all of the features
 * we would need to use in a typical lesson. If you need more/less
 * and it doesn't fit in with the rest, you should copy this and use
 * it as the base for your own.
 */
var envify     = require('@workshop/envify-files')
var browserify = require('browserify')
var watchify   = require('watchify')
var path       = require('path')
var url        = require('url')
var fs         = require('fs')
var bl         = require('bl')
var st         = require('st')

module.exports = BasicServer

function BasicServer(dirname) {
  var bundler
  var serve

  return function createServer(answersDirectory) {
    var answersTemplate = path.join(dirname, 'submission')

    return function(req, res) {
      if (!bundler) createBits()

      var uri = url.parse(req.url).pathname
      if (uri === '/') req.url = '/index.html'
      if (uri === '/index.js') {
        res.setHeader('content-type', 'text/javascript')

        return bundler.bundle().pipe(bl(function(err, bundle) {
          if (err) return res.end('document.write(' + JSON.stringify(
                '<span style="'
              + 'font-size:12px;'
              + 'font-family: Inconsolata, mono;'
              + 'padding: 2rem;'
              + 'white-space: pre-wrap;'
              + 'display: block;'
              + 'line-height: 1.35rem;'
              + '">'
              + [err.message, err.stack].join('\n')
              + '</span>'
            ) + ')'
          )

          res.end(bundle)
        }))
      }

      if (serve(req, res)) return

      res.statusCode = 404
      res.end('404! :(')
    }

    function createBits() {
      serve = st(dirname)
      bundler = watchify(browserify({
        entries: [path.join(dirname, 'index.js')]
        , index: 'index.html'
        , insertGlobals: true
        , fullPaths: true
        , packageCache: {}
        , cache: {}
      }))

      bundler.transform(require.resolve('brfs'))
      envify(answersTemplate, answersDirectory, bundler)
      bundler.transform(require.resolve('fresh-require/transform'))

      // workaround for strange browserify issue
      bundler.bundle()
        .on('data', function(){})
        .on('error', function(){})
        .resume()
    }
  }
}
