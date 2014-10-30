var path = require('path')
var fs   = require('fs')

var pkgfile = path.join(__dirname, '../package.json')
var pkg = JSON.parse(fs.readFileSync(pkgfile, 'utf8'))

pkg.scripts.postinstall = 'npm rebuild --prefix ./'
delete pkg.dependencies
delete pkg.devDependencies

fs.writeFileSync(pkgfile, JSON.stringify(pkg, null, 2))
