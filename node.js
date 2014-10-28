#!/usr/bin/env node

var wordwrap = require('wordwrap')
var inquirer = require('inquirer')
var opener   = require('opener')
var chalk    = require('chalk')

console.error()
console.error(chalk.yellow(' =============================='))
console.error(chalk.yellow(' = ~~~~~ ')+'webgl-workshop'+chalk.yellow(' ~~~~~ ='))
console.error(chalk.yellow(' =============================='))
console.error()

inquirer.prompt([{
    'type': 'confirm'
  , 'name': 'ok'
  , 'default': true
  , 'message': wordwrap(4, 80)(
    "We're about to populate this directory with some code for you to " +
    "use for your answers. If they've already been created then don't worry, " +
    "they won't be replaced. Continue?"
  ).replace(/^\s+/, '')
}], function(result) {
  if (!result.ok) return process.exit(1)

  console.error()
  require('@workshop/server')({}, function(err, address) {
    if (err) throw err

    console.error('Done! Booting up the workshop in your browser in just a second...')
    console.error('Workshop running on: '+chalk.blue(address))
    console.error()

    setTimeout(function() {
      opener(address)
    }, 1000)
  })
})
