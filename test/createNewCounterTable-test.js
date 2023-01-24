// function createNewCounterTable(arr, count, tableHeader) {
//   const d = new Date()
//   const date = dayjs(d).format('MM/DD/YY')
//   const newRow = `|<date>${date}|<${tableHeader}>${count}|`

//   arr.push(newRow)
//   debug('Added new todo row')

//   if (arr.length > 10) {
//     arr.shift()
//     debug('Removed first(old) todo row')
//   }

//   return arr
// }

const test = require('ava')
const {createNewCounterTable, COUNT_TYPE} = require('../src/readmeTableUpdates/utils')

const table = [
    '| <date>01/01/01 | <todoCounter>1  |',
    '| <date>02/02/02 | <todoCounter>2  |'
]

test('createNewCounterTable throws error when table is not an array', t => {
    const notTable = 't'
    const errorMessage = `${notTable} is not an array`
    const error = t.throws(
        () => createNewCounterTable(notTable, 2, COUNT_TYPE.TODO.tableHeader))
    t.is(error.message, errorMessage);
})

test('createNewCounterTable throws error when count is not a number', t => {
    const notNumber = '9'
    const errorMessage = `${notNumber} is not a number`
    const error = t.throws(
        () => createNewCounterTable(table, notNumber, COUNT_TYPE.TODO.tableHeader))
    t.is(error.message, errorMessage);
})

test('createNewCounterTable throws error when tableHeader is invalid', t => {
    const invalidCountType = null
    const errorMessage = `${invalidCountType} is not a string`
    const error = t.throws(
        () => createNewCounterTable(table, 2, invalidCountType))
    t.is(error.message, errorMessage);
})