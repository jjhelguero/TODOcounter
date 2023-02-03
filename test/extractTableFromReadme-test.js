const test = require('ava')
const mock = require('mock-fs')
const util = require('util')
const {
  extractTableFromReadme,
  COUNT_TYPE
} = require('../src/readmeTableUpdates/utils')

test('extractTableFromReadme for todoCounter returns a object', (t) => {
  mock({
    'mockFile1.md': '| <date>01/01/01 | <todoCounter>1  |'
  })
  t.true(
    typeof extractTableFromReadme('mockFile1.md', COUNT_TYPE.TODO.type) ===
      'object'
  )
})

test('extractTableFromReadme throws error when countType does not match', (t) => {
  mock({
    'mockFile1.md': '| <date>01/01/01 | <todoCounter>1  |'
  })
  const incorrectType = 't'
  const expectedErrorMessage = `${incorrectType} is not one of ${util.inspect(
    COUNT_TYPE
  )}`
  const actualError = t.throws(() =>
    extractTableFromReadme('mockFile1.md', incorrectType)
  )

  t.is(actualError.message, expectedErrorMessage)
})

test('extractTableFromReadme throws error when file is not passed', (t) => {
  mock({
    path: {}
  })
  t.throws(() => extractTableFromReadme('path', COUNT_TYPE.TODO.rowTag))
})
