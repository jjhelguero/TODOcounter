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
const mock = require('mock-fs')
const {checkCounterDifference, COUNT_TYPE} = require('../src/readmeTableUpdates/utils')


test('checkCounterDifference returns true when found count matches latest count', t => {
    const table = ['| <date>01/01/01 | <todoCounter>1  |',
        '| <date>02/02/02 | <todoCounter>2  |']
    t.true(checkCounterDifference(table, 2, COUNT_TYPE.TODO.tableTag))
})