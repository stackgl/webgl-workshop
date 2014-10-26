var array = new Array(512*512)
var ptr = 0
for(var s=0; s<2; ++s) {
  for(var j=0; j<256; ++j) {
    for(var t=0; t<2; ++t) {
      for(var i=0; i<256; ++i) {
        if(s^t) {
          array[ptr++] = 255
        } else {
          array[ptr++] = 0
        }
      }
    }
  }
}

module.exports = new Uint8Array(array)