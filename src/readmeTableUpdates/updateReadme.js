const fs = require('fs')
const debug = require('debug')('updateReadMeTodoCounter')
const {extractTableFromReadme, maybeUpdateReadmeTable} = require('./utils')
const encoding = 'utf-8'



function maybeUpdateReadMeCounter(count, countType) {
  const readmeFile = 'README.md'

  debug(`Reading ${readmeFile} file`)
  fs.readFile(readmeFile, encoding, function (err, data) {
    if (err) throw err

    const todoTable = extractTableFromReadme(data)

    maybeUpdateReadmeTable(readmeFile, data, todoTable, count, countType)
  })
}

;(module.exports = maybeUpdateReadMeCounter)
