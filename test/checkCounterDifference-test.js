const test = require('ava')
const {
  checkCounterDifference,
  COUNT_TYPE,
  arrayErrorMessage,
  numberErrorMessage,
  stringErrorMessage,
} = require('../src/readmeTableUpdates/utils')

const table = [
  '| <date>01/01/01 | <todoCounter>1  |',
  '| <date>02/02/02 | <todoCounter>2  |',
]

test('checkCounterDifference returns false when found count DOES NOT match latest count', (t) => {
  t.false(checkCounterDifference(table, 2, COUNT_TYPE.TODO.type))
})

test('checkCounterDifference returns true when found count does match latest count', (t) => {
  t.true(checkCounterDifference(table, 999, COUNT_TYPE.TODO.type))
})

test('checkCounterDifference throws error when table is not an array', (t) => {
  const notTable = 't'
  const expectedErrorMessage = arrayErrorMessage(notTable)
  const actualError = t.throws(() =>
    checkCounterDifference(notTable, 999, COUNT_TYPE.TODO.type),
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('checkCounterDifference throws error when count is not a number', (t) => {
  const notNumber = '9'
  const expectedErrorMessage = numberErrorMessage(notNumber)
  const actualError = t.throws(() =>
    checkCounterDifference(table, notNumber, COUNT_TYPE.TODO.type),
  )
  t.is(actualError.message, expectedErrorMessage)
})

test('checkCounterDifference throws error when countType is invalid', (t) => {
  const invalidCountType = null
  const expectedErrorMessage = stringErrorMessage(invalidCountType)
  const actualError = t.throws(() =>
    checkCounterDifference(table, 2, invalidCountType),
  )
  t.is(actualError.message, expectedErrorMessage)
})
