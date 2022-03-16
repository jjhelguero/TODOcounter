const fs = require('fs')
const debug = require('debug')('updateReadMeTodoCounter')
var dayjs = require('dayjs')


// const todoRowRegex = /(?<todoRow>\|<date>(\d{2}\/\d{2}\/\d{2})?\|<todoCounter>(\d+)?\|)/gi

function extractTodoRows(readMe) {
  debug('Extracting todo rows')
  // const todoRowRegex = /\|<date\d+>(\d{2}\/\d{2}\/\d{2})?\|<todoCounter\d+>(\d+)?\|/gi
  const todoRowRegex = /\|<date>(\d{2}\/\d{2}\/\d{2})?\|<todoCounter>(\d+)?\|/gi
  const matchedRows = (readMe || '').match(todoRowRegex) || []
  debug(`Found ${matchedRows.length} matches`)

  return matchedRows
}

function updateTodoTable(readMe, data, rowArray, todoCount) {
  // TODO add logic if latest todoCounter matches todoCount
  const lastRow = rowArray[rowArray.length - 1]
  const lastTodoCountRegex = /<todoCounter>(?<count>\d+)/
  const latestTodoCount = lastRow.match(lastTodoCountRegex).groups.count
  const updateTodoTableBool = (latestTodoCount != todoCount)

  debug(`Latest table todo count: ${latestTodoCount}\nFound todo count: ${todoCount}`)

  if (updateTodoTableBool) {
    debug('Updating todo table')

    const d = new Date()
    const date = dayjs(d).format('MM/DD/YY')
    const newRow = `|<date>${date}|<todoCounter>${todoCount}|`
    const tableRegex = /(?<todoRow>\|<date>(\d{2}\/\d{2}\/\d{2})?\|<todoCounter>(\d+)?\|)/i

    rowArray.push(newRow)
    debug('Added new todo row')

    rowArray.shift()
    debug('Removed first(old) todo row')

    // TODO figure out how to get all table with regex and then replace
    data.replace(tableRegex, rowArray)
    console.log(data.replace(tableRegex, rowArray))
    // TODO uncomment when above is fixed
    // fs.writeFile(readMe, newValue, 'utf-8', function (err, data) {
    //   if (err) throw err
    //   debug('Todo table updated!')
    // })
  } else {
    console.log('No change in todo count')
  }
}

function updateReadMeTodoCounter(tcounter) {
  const readmeFile = 'README.md'


  debug(`Reading ${readmeFile} file`)
  fs.readFile(readmeFile, 'utf-8', function (err, data) {
    if (err) throw err;

    const todoRows = extractTodoRows(data)

    updateTodoTable(readmeFile, data, todoRows, tcounter)
  })
}

updateReadMeTodoCounter(1)
module.exports = updateReadMeTodoCounter
