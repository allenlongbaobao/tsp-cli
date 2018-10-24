'use strict'

const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
  co(function *() {
    let tplName = yield prompt('Template name: ')
    let projectName = yield prompt('Project name: ')
    let gitUrl
    let branch

    if (!config.tpl[tplName]) {
      console.log(chalk.red('\n x template does not exist!'))
      process.exit()
    }
    gitUrl = config.tpl[tplName].url
    branch = config.tpl[tplName].branch

    let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName} && git checkout ${branch} && git remote remove origin`
    
    console.log(chalk.white('\n Start generating...'))

    exec(cmdStr, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        process.exit()
      }

      console.log(chalk.green('\n # Generation successfully!'))
      console.log(` \n cd ${projectName} && npm install \n`)
      console.log('About git: the default remote origin has been delete, you can add your own remote origin to it use `git remote add origin your-repo-address`')
      process.exit()
    })
  })
}

