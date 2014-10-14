var exercises = require('./exercises.json')
var url       = require('url')

process.env.PATH = [
    process.env.PATH
  , '/usr/local/bin'
].join(':')

window.resizeTo(
    window.screen.availWidth || window.screen.width
  , window.screen.availHeight || window.screen.height
)

require('@workshop/server')({
  nw: true
}, function(err, uri) {
  if (err) throw err

  var iframe = document.body.appendChild(
    document.createElement('iframe')
  )

  iframe.style.position = 'absolute'
  iframe.style.top = 0
  iframe.style.left = 0
  iframe.style.width = '100%'
  iframe.style.height = '100%'
  iframe.style.border = 0
  iframe.style.margin = 0
  iframe.style.padding = 0
  iframe.onload = function() {
    setTimeout(function() {
      win.show()
      win.focus()
    })
  }

  // General UI setup
  var gui = require('nw.gui')
  var win = gui.Window.get()

  var menu = new gui.Menu({ type: 'menubar' })
  var submenu = new gui.Menu()
  var list = new gui.MenuItem({
      label: 'Exercises'
    , submenu: submenu
  })

  Object.keys(exercises).forEach(function(name) {
    var src = url.resolve(uri, exercises[name])

    submenu.append(new gui.MenuItem({
        label: name
      , click: function() {
        iframe.src = src
      }
    }))
  })

  if (process.platform === 'darwin') {
    menu.createMacBuiltin('WebGL Workshop')
  }

  menu.append(list)

  win.menu = menu
  iframe.src = uri
})
