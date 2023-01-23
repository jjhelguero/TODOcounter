const test = require('ava')
const mock = require('mock-fs')
const {getFilesInDirectory} = require('../src/utils')


test('getFilesInDirectory returns object of more than 1 file', (t) => {
  mock({
    fakeDir: {
      'mockFile1.js': '//todo\n// todo',
      'empty-dir': {},
      sub: {
        'mockFile2.js': '// todo',
      },
      'mockFile.java': '',
    },
  })
  t.true(typeof getFilesInDirectory('fakeDir', '.js') === 'object')
  t.true(getFilesInDirectory('fakeDir', '.js').length >= 1)
})

test('getFilesInDirectory should return empty string with empty directory', (t) => {
  const validExt = '.js'
  const nullDirectory = null
  t.is(getFilesInDirectory(nullDirectory, validExt), undefined)
})

test('getFilesInDirectory should return empty string when directory is undefined', (t) => {
  const validExt = '.js'
  const undefinedDirectory = undefined
  t.is(getFilesInDirectory(undefinedDirectory, validExt), undefined)
})

test('getFilesInDirectory should return empty string when directory is invalid', (t) => {
  const validExt = '.js'
  t.is(getFilesInDirectory('invalidDirect', validExt), undefined)
})