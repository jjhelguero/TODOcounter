const dayjs = require('dayjs')
const debug = require('debug')('todo-counter')
const fs = require('fs')
const util = require('util')

const FILE_ENCODING = 'utf-8'
const todoRowMatcher =
  /(?<row>\|<date>\d{2}\/\d{2}\/\d{2}\|<todoCounter>\d+\|)/gi
const skippedRowMatcher =
  /(?<row>\|<date>\d{2}\/\d{2}\/\d{2}\|<skippedTestsCounter>\d+\|)/gi
const COUNT_TYPE = {
  TODO: {
    type: 'Todo',
    rowTag: 'todoCounter',
  },
  SKIP: {
    type: 'SkippedTests',
    rowTag: 'skippedTestsCounter',
  },
}
const arrayErrorMessage = (arr) => `${arr} is not an array`
const numberErrorMessage = (num) => `${num} is not a number`
const stringErrorMessage = (type) => `${type} is not a string`

function formatArrayToStringTable(arr) {
  return arr.toString().replace(/\|,/g, '|\n')
}

/**
 * Utility function to extract todo table from existing
 * README in current directory and return table rows in array
 * @param {File} readMePath
 * @param {String} countType
 * @returns number length
 */
function extractTableFromReadme(readMePath, countType) {
  debug('Extracting rows')
  let rowMatcher

  if (countType == COUNT_TYPE.TODO.type) {
    rowMatcher = todoRowMatcher
  } else if (countType == COUNT_TYPE.SKIP.type) {
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
  if (!Array.isArray(table)) throw new Error(arrayErrorMessage(table))
  if (typeof count !== 'number') throw new Error(numberErrorMessage(count))
  if (typeof countType !== 'string')
    throw new Error(stringErrorMessage(countType))

  let lastCountRegex
  const lastRow = table[table.length - 1]
  if (countType == COUNT_TYPE.TODO.rowTag) {
    lastCountRegex = /<todoCounter>(?<count>\d+)/
  } else if (countType == COUNT_TYPE.SKIP.rowTag) {
    lastCountRegex = /<skippedTestsCounter>(?<count>\d+)/
  }
  const latestCount = lastRow.match(lastCountRegex)?.groups?.count
  debug(`Latest table count: ${latestCount}\nFound count: ${count}`)

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
  if (!Array.isArray(arr)) throw new Error(arrayErrorMessage(arr))
  if (typeof count !== 'number') throw new Error(numberErrorMessage(count))
  if (typeof type !== 'string') throw new Error(stringErrorMessage(type))

  const d = new Date()
  const date = dayjs(d).format('MM/DD/YY')
  const newRow = `|<date>${date}|<${type}>${count}|`
  const cloneArr = [...arr]

  cloneArr.push(newRow)
  debug('Added new row')

  if (cloneArr.length > 10) {
    cloneArr.shift()
    debug('Removed first(old) row')
  }

  return cloneArr
}

/**
 * Utility function to update counter table in ReadMe fie
 * @param {File} data
 * @param {String} oldTable
 * @param {Number} count
 * @param {String} type 'todo' or 'skippedTest'
 * @returns
 */
function updateReadMe(readMeData, oldTable, count, type) {
  if (typeof readMeData !== 'string')
    throw new Error(stringErrorMessage(readMeData))
  if (!Array.isArray(oldTable)) throw new Error(arrayErrorMessage(oldTable))
  if (typeof count !== 'number') throw new Error(numberErrorMessage(count))
  if (typeof type !== 'string') throw new Error(stringErrorMessage(type))

  const tableWithoutHeader = createNewCounterTable(oldTable, count, type)
  const formattedTableWithoutHeader =
    formatArrayToStringTable(tableWithoutHeader)
  const formattedOldTable = formatArrayToStringTable(oldTable)
  return readMeData.replace(formattedOldTable, formattedTableWithoutHeader)
}

/**
 * Checks to see if the counterTable is outdated and will update the table
 * if need be
 * @param {File} readMe Readme file
 * @param {String} data data from fs.readFile
 * @param {Array} oldCountTable outdated table
 * @param {Number} foundCount found todo/skipped count
 * @param {String} countType todo/skipped
 */
function maybeUpdateReadmeTable(
  readMePath,
  readMeData,
  oldCountTable,
  foundCount,
  countType,
) {
  if (typeof readMeData !== 'string')
    throw new Error(stringErrorMessage(readMeData))
  if (!Array.isArray(oldCountTable))
    throw new Error(arrayErrorMessage(oldCountTable))
  if (typeof foundCount !== 'number')
    throw new Error(numberErrorMessage(foundCount))
  if (typeof countType !== 'string')
    throw new Error(stringErrorMessage(countType))

  const isCountDifferent = checkCounterDifference(
    oldCountTable,
    foundCount,
    countType,
  )

  if (isCountDifferent) {
    debug('Updating table')

    const newReadMe = updateReadMe(
      readMeData,
      oldCountTable,
      foundCount,
      countType,
    )

    fs.writeFile(readMePath, newReadMe, FILE_ENCODING, function (err, data) {
      if (err) throw err
      debug('ReadMe file updated!')
    })
  } else {
    console.log('No change in count %d', foundCount)
  }
}

module.exports = {
  extractTableFromReadme,
  checkCounterDifference,
  updateReadMe,
  maybeUpdateReadmeTable,
  createNewCounterTable,
  COUNT_TYPE,
  FILE_ENCODING,
  arrayErrorMessage,
  numberErrorMessage,
  stringErrorMessage,
}
