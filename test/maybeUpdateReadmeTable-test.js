const test = require('ava')
const mock = require('mock-fs')
const fs = require('fs')
const {
  maybeUpdateReadmeTable,
  stringErrorMessage,
  arrayErrorMessage,
  numberErrorMessage,
  COUNT_TYPE,
} = require('../src/readmeTableUpdates/utils')

test('maybeUpdateReadmeTable throws an error when data is not a string', (t) => {
  mock({
    'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`,
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const oldTable = data.split(/\n {8}/)
  const badData = {}
  const count = 100
  const expectedErrorMessage = stringErrorMessage(badData)
  const actualError = t.throws(() =>
    maybeUpdateReadmeTable(
      'mockFile1.md',
      badData,
      oldTable,
      count,
      COUNT_TYPE.TODO.type,
    ),
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('maybeUpdateReadmeTable throws an error when old table is not an array', (t) => {
  mock({
    'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`,
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const badOldTable = ''
  const count = 10
  const expectedErrorMessage = arrayErrorMessage(badOldTable)
  const actualError = t.throws(() =>
    maybeUpdateReadmeTable(
      'mockFile1.md',
      data,
      badOldTable,
      count,
      COUNT_TYPE.TODO.type,
    ),
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('maybeUpdateReadmeTable throws an error when count is not a number', (t) => {
  mock({
    'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`,
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const oldTable = data.split(/\n {8}/)
  const badCount = '100'
  const expectedErrorMessage = numberErrorMessage(badCount)
  const actualError = t.throws(() =>
    maybeUpdateReadmeTable(
      'mockFile1.md',
      data,
      oldTable,
      badCount,
      COUNT_TYPE.TODO.type,
    ),
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('maybeUpdateReadmeTable throws an error when countType is not a string', (t) => {
  mock({
    'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`,
  })
  const data = fs.readFileSync('mockFile1.md').toString()
  const oldTable = data.split(/\n {8}/)
  const count = 100
  const badCountType = null
  const expectedErrorMessage = stringErrorMessage(badCountType)
  const actualError = t.throws(() =>
    maybeUpdateReadmeTable('mockFile1.md', data, oldTable, count, badCountType),
  )
  t.is(actualError.message, expectedErrorMessage)
})
