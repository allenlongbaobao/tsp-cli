'use strict'
const config = require('../templates')

module.exports = () => {
  const names = Object.keys(config.tpl)
  names.forEach((name, index) => {
    console.log(`${index}. ${name}`)
  })
  process.exit()
}
