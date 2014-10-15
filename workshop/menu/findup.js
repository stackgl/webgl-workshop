// lazy workaround for brstar support
var findup = require('findup').sync
var path   = require('path')

module.exports = function(dir) {
  return path.join(findup(dir, 'exercises.json'), 'exercises.json')
}
