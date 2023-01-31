const dayjs = require('dayjs')
const test = require('ava')
const {
  createNewCounterTable,
  COUNT_TYPE,
  arrayErrorMessage,
  numberErrorMessage,
  stringErrorMessage
} = require('../src/readmeTableUpdates/utils')

test('createNewCounterTable returns new counter Table when table is less than 10 rows', (t) => {
  const count = 10
  const table = [
    '| <date>01/01/01 | <todoCounter>1  |',
    '| <date>02/02/02 | <todoCounter>2  |',
    '| <date>03/03/03 | <todoCounter>3  |',
    '| <date>04/04/04 | <todoCounter>4  |',
    '| <date>05/05/05 | <todoCounter>5  |',
    '| <date>06/06/06 | <todoCounter>6  |',
    '| <date>07/07/07 | <todoCounter>7  |',
    '| <date>08/08/08 | <todoCounter>8  |',
    '| <date>09/09/09 | <todoCounter>9  |'
  ]
  const d = new Date()
  const date = dayjs(d).format('MM/DD/YY')
  const newRow = `|<date>${date}|<${COUNT_TYPE.TODO.type.toLowerCase()}Counter>${count}|`
  const newTable = [...table]
  newTable.push(newRow)

  t.deepEqual(
    createNewCounterTable(table, count, COUNT_TYPE.TODO.type),
    newTable
  )
})

test('createNewCounterTable returns new counter Table when table is 10 rows', (t) => {
  const count = 10
  const table = [
    '| <date>01/01/01 | <todoCounter>1  |',
    '| <date>02/02/02 | <todoCounter>2  |',
    '| <date>03/03/03 | <todoCounter>3  |',
    '| <date>04/04/04 | <todoCounter>4  |',
    '| <date>05/05/05 | <todoCounter>5  |',
    '| <date>06/06/06 | <todoCounter>6  |',
    '| <date>07/07/07 | <todoCounter>7  |',
    '| <date>08/08/08 | <todoCounter>8  |',
    '| <date>09/09/09 | <todoCounter>9  |',
    '| <date>10/10/10 | <todoCounter>1  |'
  ]
  const d = new Date()
  const date = dayjs(d).format('MM/DD/YY')
  const newRow = `|<date>${date}|<${COUNT_TYPE.TODO.type.toLowerCase()}Counter>${count}|`
  const newTable = [...table]
  newTable.push(newRow)
  newTable.shift()

  t.deepEqual(
    createNewCounterTable(table, count, COUNT_TYPE.TODO.type),
    newTable
  )
})

test('createNewCounterTable throws error when table is not an array', (t) => {
  const notTable = 't'
  const expectedErrorMessage = arrayErrorMessage(notTable)
  const actualError = t.throws(() =>
    createNewCounterTable(notTable, 2, COUNT_TYPE.TODO.tableHeader)
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('createNewCounterTable throws error when count is not a number', (t) => {
  const table = ['| <date>01/01/01 | <todoCounter>1  |']
  const notNumber = '9'
  const expectedErrorMessage = numberErrorMessage(notNumber)
  const actualError = t.throws(() =>
    createNewCounterTable(table, notNumber, COUNT_TYPE.TODO.tableHeader)
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('createNewCounterTable throws error when tableHeader is invalid', (t) => {
  const table = ['| <date>01/01/01 | <todoCounter>1  |']
  const invalidCountType = null
  const expectedErrorMessage = stringErrorMessage(invalidCountType)
  const actualError = t.throws(() =>
    createNewCounterTable(table, 2, invalidCountType)
  )
  t.is(actualError.message, expectedErrorMessage)
})
