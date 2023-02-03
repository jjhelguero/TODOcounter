const test = require('ava')
const dayjs = require('dayjs')
const mock = require('mock-fs')
const fs = require('fs')
const {
  updateReadMe,
  COUNT_TYPE,
  stringErrorMessage,
  arrayErrorMessage,
  numberErrorMessage
} = require('../src/readmeTableUpdates/utils')

function expectedUpdatedReadMe (readMeWithOutTable, oldTable, count) {
  const formattedOldTable = oldTable.toString().replace(',', '\n')
  const d = new Date()
  const date = dayjs(d).format('MM/DD/YY')
  return `${readMeWithOutTable}\n${formattedOldTable}\n|<date>${date}|<todoCounter>${count}|`
}

const testReadMeWithoutCounterTable = 'This is a readme\n\n'
const tableHeader = '| Date | Todo Count |\n| :---:| :---:|'

test('updateReadMe returns new Readme with updated table', (t) => {
  const table = `${tableHeader}
|<date>01/01/01|<todoCounter>1|
|<date>02/02/02|<todoCounter>2|
|<date>03/03/03|<todoCounter>3|
|<date>04/04/04|<todoCounter>4|`
  mock({
    'mockFile1.md': `${testReadMeWithoutCounterTable}\n${table}`
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const extractedTable = data.split(tableHeader + '\n')[1]
  const arrayOfOldTable = extractedTable.split(/\n/)
  const count = 100
  const actualNewReadMe = updateReadMe(data, arrayOfOldTable, count, COUNT_TYPE.TODO.type)
  const expectedNewReadMe = expectedUpdatedReadMe(testReadMeWithoutCounterTable, table, count)
  t.deepEqual(actualNewReadMe, expectedNewReadMe)
})

test('updateReadMe returns new Readme with updated table already having 10 entries', (t) => {
  const table = `${tableHeader}
|<date>01/01/01|<todoCounter>1|
|<date>02/02/02|<todoCounter>2|
|<date>03/03/03|<todoCounter>3|
|<date>04/04/04|<todoCounter>4|
|<date>05/05/05|<todoCounter>5|
|<date>06/06/06|<todoCounter>6|
|<date>07/07/07|<todoCounter>7|
|<date>08/08/08|<todoCounter>8|
|<date>09/09/09|<todoCounter>9|
|<date>10/10/10|<todoCounter>10|`
  mock({
    'mockFile1.md': `${testReadMeWithoutCounterTable}\n${table}`
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const extractedTable = data.split(tableHeader + '\n')[1]
  const arrayOfOldTable = extractedTable.split(/\n/)
  const copy = [...arrayOfOldTable]
  copy.shift()
  const count = 100
  const actualNewReadMe = updateReadMe(data, copy, count, COUNT_TYPE.TODO.type)
  const expectedNewReadMe = expectedUpdatedReadMe(testReadMeWithoutCounterTable, table, count)
  t.deepEqual(actualNewReadMe, expectedNewReadMe)
})

test('updateReadMe throws an error when data is not a string', (t) => {
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
    updateReadMe(badData, oldTable, count, COUNT_TYPE.TODO.type)
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('updateReadMe throws an error when old table is not an array', (t) => {
  mock({
    'mockFile1.md': `|<date>01/01/01|<todoCounter>1|
     |<date>02/02/02|<todoCounter>2|
     |<date>03/03/03|<todoCounter>3|
     |<date>04/04/04|<todoCounter>4|`
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const badOldTable = ''
  const count = 10
  const expectedErrorMessage = arrayErrorMessage(badOldTable)
  const actualError = t.throws(() =>
    updateReadMe(data, badOldTable, count, COUNT_TYPE.TODO.type)
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('updateReadMe throws an error when count is not a number', (t) => {
  mock({
    'mockFile1.md': `|<date>01/01/01|<todoCounter>1|
     |<date>02/02/02|<todoCounter>2|
     |<date>03/03/03|<todoCounter>3|
     |<date>04/04/04|<todoCounter>4|`
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const oldTable = data.split(/\n {8}/)
  const badCount = '100'
  const expectedErrorMessage = numberErrorMessage(badCount)
  const actualError = t.throws(() =>
    updateReadMe(data, oldTable, badCount, COUNT_TYPE.TODO.type)
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('updateReadMe throws an error when countType is not a string', (t) => {
  mock({
    'mockFile1.md': `|<date>01/01/01|<todoCounter>1|
     |<date>02/02/02|<todoCounter>2|
     |<date>03/03/03|<todoCounter>3|
     |<date>04/04/04|<todoCounter>4|`
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const oldTable = data.split(/\n {8}/)
  const count = 100
  const badCountType = null
  const expectedErrorMessage = stringErrorMessage(badCountType)
  const actualError = t.throws(() =>
    updateReadMe(data, oldTable, count, badCountType)
  )
  t.is(actualError.message, expectedErrorMessage)
})
