var path = require('path')
var fs   = require('fs')

var pkgfile = path.join(__dirname, '../package.json')
var pkg = JSON.parse(fs.readFileSync(pkgfile, 'utf8'))

pkg.bundledDependences = []
delete pkg.devDependencies

Object.keys(pkg.dependencies).forEach(function(key) {
  if (pkg.dependencies[key].indexOf('file:')) return
  delete pkg.dependencies[key]
  pkg.bundledDependences.push(key)
  console.error('bundling: ' + key)
})

fs.writeFileSync(pkgfile, JSON.stringify(pkg, null, 2))
