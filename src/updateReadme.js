const fs = require('fs')
const debug = require('debug')('updateReadMeTodoCounter')
const dayjs = require('dayjs')
const encoding = 'utf-8'

function extractTodoRows (readMe) {
  debug('Extracting todo rows')

  const todoRowRegex =
    /\|<date>(\d{2}\/\d{2}\/\d{2})?\|<todoCounter>(\d+)?\|/gi
  const matchedRows = (readMe || '').match(todoRowRegex) || []
  debug(`Found ${matchedRows.length} matches`)

  return matchedRows
}

function checkTodoCountDifference (table, count) {
  const lastRow = table[table.length - 1]
  const lastTodoCountRegex = /<todoCounter>(?<count>\d+)/
  const latestTodoCount = lastRow.match(lastTodoCountRegex).groups.count
  debug(
    `Latest table todo count: ${latestTodoCount}\nFound todo count: ${count}`
  )

  return latestTodoCount != count
}
function createNewTodoTable (arr, count) {
  const d = new Date()
  const date = dayjs(d).format('MM/DD/YY')
  const newRow = `|<date>${date}|<todoCounter>${count}|`
  const endTableTag = '</table>'

  arr.push(newRow)
  debug('Added new todo row')

  arr.shift()
  debug('Removed first(old) todo row')

  arr.push(endTableTag)

  return arr
}

function createNewReadMe (data, oldTable, count) {
  const tableHeader = '| Date | Todo Count |\n| :---:| :---:|\n'
  const startTableTagIndex = data.indexOf(tableHeader)
  const removedTableReadMe = data.substring(0, startTableTagIndex)
  const todoTableWithoutHeader = createNewTodoTable(oldTable, count)
    .toString()
    .replace(/\|,/g, '|\n')
  const newTodoTable = tableHeader.concat(todoTableWithoutHeader)

  return removedTableReadMe.concat(newTodoTable)
}

function updateTodoTable (readMe, data, oldTodoTable, todoCount) {
  const isTodoCountDifferent = checkTodoCountDifference(
    oldTodoTable,
    todoCount
  )

  if (isTodoCountDifferent) {
    debug('Updating todo table')

    const newReadMe = createNewReadMe(data, oldTodoTable, todoCount)

    fs.writeFile(readMe, newReadMe, encoding, function (err, data) {
      if (err) throw err
      debug('ReadMe file updated!')
    })
  } else {
    console.log('No change in todo count')
  }
}

function updateReadMeTodoCounter (tcounter) {
  const readmeFile = 'README.md'

  debug(`Reading ${readmeFile} file`)
  fs.readFile(readmeFile, encoding, function (err, data) {
    if (err) throw err

    const todoRows = extractTodoRows(data)

    updateTodoTable(readmeFile, data, todoRows, tcounter)
  })
}

module.exports = updateReadMeTodoCounter
