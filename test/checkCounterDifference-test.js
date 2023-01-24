// function checkCounterDifference(table, count, tableHeader) {
//   const lastRow = table[table.length - 1]
//   const lastCountRegex = new RegExp(`<${tableHeader}>(?<count>\d+)`)
//   const latestCount = lastRow.match(lastCountRegex).groups.count
//   debug(
//     `Latest table todo count: ${latestCount}\nFound todo count: ${count}`,
//   )

//   return latestCount != count
// }

const test = require('ava')
const {checkCounterDifference, COUNT_TYPE} = require('../src/readmeTableUpdates/utils')

const table = [
    '| <date>01/01/01 | <todoCounter>1  |',
    '| <date>02/02/02 | <todoCounter>2  |'
]

test('checkCounterDifference returns false when found count DOES NOT match latest count', t => {
    t.false(checkCounterDifference(table, 2, COUNT_TYPE.TODO.type))
})

test('checkCounterDifference returns true when found count does match latest count', t => {
    t.true(checkCounterDifference(table, 999, COUNT_TYPE.TODO.type))
})

test('checkCounterDifference throws error when table is not an array', t => {
    const notTable = 't'
    const errorMessage = `${notTable} is not an array`
    const error = t.throws(
        () => checkCounterDifference(notTable, 999, COUNT_TYPE.TODO.type))
    t.is(error.message, errorMessage);
})

test('checkCounterDifference throws error when count is not a number', t => {
    const notNumber = '9'
    const errorMessage = `${notNumber} is not a number`
    const error = t.throws(
        () => checkCounterDifference(table, notNumber, COUNT_TYPE.TODO.type))
    t.is(error.message, errorMessage);
})

test('checkCounterDifference throws error when countType is invalid', t => {
    const invalidCountType = null
    const errorMessage = `${invalidCountType} is not a string`
    const error = t.throws(
        () => checkCounterDifference(table, 2, invalidCountType))
    t.is(error.message, errorMessage);
})