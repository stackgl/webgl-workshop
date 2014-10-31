var createBunny = require('./draw-bunny')
var drawBunny

exports.init = function(gl, t) {
  drawBunny = createBunny(gl)
}

// Uncomment the bunny draw call to proceed!
exports.draw = function(gl, t) {
  // drawBunny(gl, t)
}
