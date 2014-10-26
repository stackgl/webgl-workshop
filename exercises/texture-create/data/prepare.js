'use strict'

var baboon = require('baboon-image')
var dataSlice = [].slice.call(baboon.data)
console.log(JSON.stringify(dataSlice))
