const test = require('ava')
const mock = require('mock-fs')
const searchSkippedTestsInFilesInDirectory = require('../src/searchSkippedTestsInFilesInDirectory')

test('searchSkippedTestsInFilesInDirectory returns a number', (t) => {
  mock({
    fakeDir: {
      'mockFile1.js': 'it.skip\ndescribe.skip',
      'empty-dir': {},
      sub: {
        'mockFile2.js': '// skip:',
      },
      'mockFile.java': '',
    },
  })
  const num = searchSkippedTestsInFilesInDirectory('fakeDir', '.js')
  t.true(typeof num === 'number')
})

test('searchSkippedTestsInFilesInDirectory returns count of 2', (t) => {
  mock({
    fakeDir: {
      'mockFile1.js': 'it.skip\n// skip:',
      'empty-dir': {},
      sub: {
        'mockFile2.js': 'describe.skip',
      },
      'mockFile.java': '',
    },
  })
  const num = searchSkippedTestsInFilesInDirectory('fakeDir', '.js')
  t.true(num == 2)
})

test('searchSkippedTestsInFilesInDirectory should return empty string with null directory', (t) => {
  const validExt = '.js'
  const nullDirectory = null
  t.is(searchSkippedTestsInFilesInDirectory(nullDirectory, validExt), undefined)
})

test('searchSkippedTestsInFilesInDirectory should return empty string with undefined directory', (t) => {
  const validExt = '.js'
  const undefinedDirectory = undefined
  t.is(
    searchSkippedTestsInFilesInDirectory(undefinedDirectory, validExt),
    undefined,
  )
})

test('searchSkippedTestsInFilesInDirectory should return empty string with invalid directory', (t) => {
  const validExt = '.js'
  t.is(
    searchSkippedTestsInFilesInDirectory('invalidDirect', validExt),
    undefined,
  )
})
