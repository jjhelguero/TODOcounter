const fs = require('fs')
const debug = require('debug')('updateReadMeTodoCounter')
const {extractTableFromReadme, maybeUpdateReadmeTable, COUNT_TYPE, FILE_ENCODING} = require('./utils')


function maybeUpdateReadMeCounter(count, type) {
  const readmeFile = 'README.md'
  let headerString, tableHeaderTag
  
  if(type == COUNT_TYPE.TODO.type) {
    headerString = 'Todo'
    tableHeaderTag  = COUNT_TYPE.TODO.tableHeader
  } else if (type == COUNT_TYPE.SKIP.type){
    headerString = 'Skipped Tests'
    tableHeaderTag  = COUNT_TYPE.SKIP.tableHeader
  }

  debug(`Reading ${readmeFile} file`)
  fs.readFileSync(readmeFile, FILE_ENCODING, function (err, data) {
    if (err) throw err

    const todoTable = extractTableFromReadme(data, tableHeaderTag)

    maybeUpdateReadmeTable(readmeFile, data, todoTable, count, tableHeaderString)
  })
}

;(module.exports = maybeUpdateReadMeCounter)