const dayjs = require('dayjs')
const debug = require('debug')('updateReadMeTodoCounter')
const fs = require('fs')
const util = require('util')

const FILE_ENCODING = 'utf-8'
const todoRowMatcher = /(?<row>\|\s+<date>\d{2}\/\d{2}\/\d{2}\s+\|\s+<todoCounter>\d+\s+\|)/gi
const skippedRowMatcher = /(?<row>\|\s+<date>\d{2}\/\d{2}\/\d{2}\s+\|\s+<skippedCounter>\d+\s+\|)/gi
const COUNT_TYPE = {
  TODO: {
    type: 'todo',
    tableHeader: 'todoCounter'
  },
  SKIP: {
    type: 'skipped',
    tableHeader: 'skippedTestsCounter'
  }
}
const arrayErrorMessage = (arr) => `${arr} is not an array`
const numberErrorMessage = (num) => `${num} is not a number`
const stringErrorMessage = (type) => `${type} is not a string`

/**
 * Utility function to extract todo table from existing
 * README in current directory and return table rows in array
 * @param {File} readMePath
 * @param {String} countType
 * @returns number length
 */
function extractTableFromReadme(readMePath, countType) {
  debug('Extracting todo rows')
  let rowMatcher

  if( countType == COUNT_TYPE.TODO.tableHeader) {
    rowMatcher = todoRowMatcher
  } else if (countType == COUNT_TYPE.SKIP.tableHeader) {
    rowMatcher = skippedRowMatcher
  } else {
    throw new Error(countType + ` is not one of ${util.inspect(COUNT_TYPE)}`)
  }

  const file = fs.readFileSync(readMePath, FILE_ENCODING)
  const matchedRows = file.match(rowMatcher) || []

  debug(`Found ${matchedRows.length} matches`)

  return matchedRows
}

/**
 * Utiliy function to check if latest todo count in readme
 * table does not match the found todo count
 * @param {String} table todo table
 * @param {Number} count found todo count
 * @param {String} tableHeader
 * @returns {Boolean}
 */
function checkCounterDifference(table, count, countType) {
  if(!Array.isArray(table)) throw new Error(arrayErrorMessage(table))
  if(typeof count !== 'number') throw new Error(numberErrorMessage(count))
  if(typeof countType !== 'string') throw new Error(stringErrorMessage(countType))
  
  let lastCountRegex
  const lastRow = table[table.length - 1]
  if(countType == COUNT_TYPE.TODO.type) {
    lastCountRegex = /<todoCounter>(?<count>\d+)/
  } else if(countType == COUNT_TYPE.SKIP.type) {
    lastCountRegex = /<skippedCounter>(?<count>\d+)/
  }
  const latestCount = lastRow.match(lastCountRegex)?.groups?.count
  debug(
    `Latest table todo count: ${latestCount}\nFound todo count: ${count}`,
  )

  return latestCount != count
}

/**
 * Utility function to create new todo table
 * @param {Array<string>} arr
 * @param {Number} count
 * * @param {String} tableHeader
 * @returns {Array<string>}
 */
function createNewCounterTable(arr, count, type) {
  if(!Array.isArray(arr)) throw new Error(arrayErrorMessage(arr))
  if(typeof count !== 'number') throw new Error(numberErrorMessage(count))
  if(typeof type !== 'string') throw new Error(stringErrorMessage(type))

  const d = new Date()
  const date = dayjs(d).format('MM/DD/YY')
  const newRow = `| <date>${date} | <${type}Counter>${count} |`

  arr.push(newRow)
  debug('Added new todo row')

  if (arr.length > 10) {
    arr.shift()
    debug('Removed first(old) todo row')
  }

  return arr
}

/**
 * Utilty function to create new Readme
 * @param {File} data
 * @param {String} oldTable
 * @param {Number} count
 * @returns
 */
function createNewReadMe(data, oldTable, count,type) {
  if(typeof data !== 'string') throw new Error(stringErrorMessage(data))
  if(!Array.isArray(oldTable)) throw new Error(arrayErrorMessage(oldTable))
  if(typeof count !== 'number') throw new Error(numberErrorMessage(count))
  if(typeof type !== 'string') throw new Error(stringErrorMessage(type))

  const tableHeader = `| Date | ${type} Count |\n| :---:| :---:|\n`
  const startTableTagIndex = data.indexOf(tableHeader)
  const extractedCounterTable = data.substring(0, startTableTagIndex)
  const tableWithoutHeader = createNewCounterTable(oldTable, count, type)
    .toString()
    .replace(/\|,/g, '|\n')
  const newCounterTable = tableHeader.concat(tableWithoutHeader, '\n')

  return extractedCounterTable.concat(newCounterTable)
}

/**
 * 
 * @param {File} readMe Readme file
 * @param {String} data data from fs.readFile
 * @param {String} oldTable outdated table
 * @param {Number} foundCount found todo/skipped count
 * @param {String} countType todo/skipped 
 */
function maybeUpdateReadmeTable(readMePath, readMeData, oldCountTable, foundCount, countHeader) {
  if(typeof readMeData !== 'string') throw new Error(stringErrorMessage(readMeData))
  if(!Array.isArray(oldCountTable)) throw new Error(arrayErrorMessage(oldCountTable))
  if(typeof foundCount !== 'number') throw new Error(numberErrorMessage(foundCount))
  if(typeof countHeader !== 'string') throw new Error(stringErrorMessage(countHeader))

  const isCountDifferent = checkCounterDifference(oldCountTable, foundCount, countHeader)

  if (isCountDifferent) {
    debug('Updating todo table')

    const newReadMe = createNewReadMe(readMeData, oldCountTable, foundCount, countHeader)

    fs.writeFile(readMePath, newReadMe, {encoding:FILE_ENCODING, flag: 'a+'}, function (err, data) {
      if (err) throw err
      debug('ReadMe file updated!')
    })
  } else {
    console.log('No change in todo count')
  }
}

;(module.exports = {
  extractTableFromReadme, 
  checkCounterDifference, 
  createNewReadMe, 
  maybeUpdateReadmeTable,
  createNewCounterTable,
  COUNT_TYPE, 
  FILE_ENCODING,
  arrayErrorMessage,
  numberErrorMessage,
  stringErrorMessage
})