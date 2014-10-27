var noop = (function(){})
var path = require('path')
var cpr  = require('cpr')
var fs   = require('fs')

module.exports = copy

function copy(node_modules, answerDir, done) {
  var answer_modules = path.join(answerDir, 'node_modules')
  var complete = 0

  var modules = fs.readdirSync(node_modules).filter(function(name) {
    return name.charAt(0) !== '@'
  })

  fs.exists(answer_modules, function(exists) {
    if (exists) return done()

    modules.forEach(function(name) {
      var src = path.join(node_modules, name)
      var dst = path.join(answerDir, 'node_modules', name)

      cpr(src, dst, {
        deleteFirst: false
        , overwrite: false
      }, function(err) {
        if (err) return (done(err), done = noop)
        if (++complete === modules.length) done()
      })
    })
  })
}
