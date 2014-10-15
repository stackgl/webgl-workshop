var beefy = require('beefy')

module.exports = function() {
  return beefy({
      cwd: __dirname
    , entries: ['menu.js']
    , quiet: false
    , watchify: false
  })
}
