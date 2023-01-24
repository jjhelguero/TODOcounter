const fs = require('fs')
const debug = require('debug')('updateReadMeTodoCounter')
const {extractTableFromReadme, maybeUpdateReadmeTable, COUNT_TYPE} = require('./utils')
const encoding = 'utf-8'


function maybeUpdateReadMeCounter(count, type) {
  const readmeFile = 'README.md'
  let headerString, tableHeaderTag
  
  if(type == COUNT_TYPE.TODO) {
    headerString = 'Todo'
    tableHeaderTag  = 'todoCounter'
  } else if (type == COUNT_TYPE.SKIP){
    headerString = 'Skipped Tests'
    tableHeaderTag  = 'skippedTestsCounter'
  }

  debug(`Reading ${readmeFile} file`)
  fs.readFileSync(readmeFile, encoding, function (err, data) {
    if (err) throw err

    const todoTable = extractTableFromReadme(data, tableHeaderTag)

    maybeUpdateReadmeTable(readmeFile, data, todoTable, count, tableHeaderString)
  })
}

;(module.exports = maybeUpdateReadMeCounter)