try {
  var inline = require('rework-plugin-inline')
  var rework = require('rework')
  var fs     = require('fs')
} catch(e) {
  return console.error('dependencies missing, ignoring')
}

var input  = process.argv[2]
var output = process.argv[3]

var css = fs.readFileSync(input, 'utf8')

css = rework(css)
  .use(inline(__dirname + '/icons/'))
  .toString()

fs.writeFileSync(output, css)
