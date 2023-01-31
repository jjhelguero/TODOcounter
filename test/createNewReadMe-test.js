const test = require('ava')
const dayjs = require('dayjs')
const mock = require('mock-fs')
const fs = require('fs')
const {
  updateCounterTable,
  COUNT_TYPE,
  stringErrorMessage,
  arrayErrorMessage,
  numberErrorMessage
} = require('../src/readmeTableUpdates/utils')

test('updateCounterTable creates README Text', (t) => {
  mock({
    'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const oldTable = data.split(/\n {8}/)
  const formattedOldTable = oldTable.toString().replace(/\|,/g, '|\n')
  const count = 10
  const d = new Date()
  const date = dayjs(d).format('MM/DD/YY')
  const expectedNewReadMe = `| Date | ${COUNT_TYPE.TODO.type} Count |
| :---:| :---:|
${formattedOldTable}
|<date>${date}|<todoCounter>${count}|
`
  const newTable = updateCounterTable(data, oldTable, count, COUNT_TYPE.TODO.type)
  t.deepEqual(newTable, expectedNewReadMe)
})

test('updateCounterTable creates README Text with table already having 10 entries', (t) => {
  mock({
    'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |
        | <date>05/05/05 | <todoCounter>5  |
        | <date>06/06/06 | <todoCounter>6  |
        | <date>07/07/07 | <todoCounter>7  |
        | <date>08/08/08 | <todoCounter>8  |
        | <date>09/09/09 | <todoCounter>9  |
        | <date>10/10/10 | <todoCounter>10 |`
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const oldTable = data.split(/\n {8}/)
  oldTable.shift()
  const formattedOldTable = oldTable.toString().replace(/\|,/g, '|\n')
  const count = 100
  const d = new Date()
  const date = dayjs(d).format('MM/DD/YY')
  const expectedNewReadMe = `| Date | ${COUNT_TYPE.TODO.type} Count |
| :---:| :---:|
${formattedOldTable}
|<date>${date}|<todoCounter>${count}|
`
  const newTable = updateCounterTable(data, oldTable, count, COUNT_TYPE.TODO.type)
  t.deepEqual(newTable, expectedNewReadMe)
})

test('updateCounterTable throws an error when data is not a string', (t) => {
  mock({
    'mockFile1.md': `|<date>01/01/01|<todoCounter>1|
        |<date>02/02/02|<todoCounter>2|
        |<date>03/03/03|<todoCounter>3|
        |<date>04/04/04|<todoCounter>4|`
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const oldTable = data.split(/\n {8}/)
  const badData = {}
  const count = 100
  const expectedErrorMessage = stringErrorMessage(badData)
  const actualError = t.throws(() =>
    updateCounterTable(badData, oldTable, count, COUNT_TYPE.TODO.type)
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('updateCounterTable throws an error when old table is not an array', (t) => {
  mock({
    'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const badOldTable = ''
  const count = 10
  const expectedErrorMessage = arrayErrorMessage(badOldTable)
  const actualError = t.throws(() =>
    updateCounterTable(data, badOldTable, count, COUNT_TYPE.TODO.type)
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('updateCounterTable throws an error when count is not a number', (t) => {
  mock({
    'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const oldTable = data.split(/\n {8}/)
  const badCount = '100'
  const expectedErrorMessage = numberErrorMessage(badCount)
  const actualError = t.throws(() =>
    updateCounterTable(data, oldTable, badCount, COUNT_TYPE.TODO.type)
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('updateCounterTable throws an error when countType is not a string', (t) => {
  mock({
    'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const oldTable = data.split(/\n {8}/)
  const count = 100
  const badCountType = null
  const expectedErrorMessage = stringErrorMessage(badCountType)
  const actualError = t.throws(() =>
    updateCounterTable(data, oldTable, count, badCountType)
  )
  t.is(actualError.message, expectedErrorMessage)
})
