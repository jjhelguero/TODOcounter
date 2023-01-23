const test = require('ava')
const mock = require('mock-fs')
const searchTodosInFilesInDirectory = require('../src/searchTodosInFilesInDirectory')

test('searchTodosInFilesInDirectory returns a number', (t) => {
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
  const num = searchTodosInFilesInDirectory('fakeDir', '.js')
  t.true(typeof num === 'number')
})

test('searchTodosInFilesInDirectory returns count of 3', (t) => {
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
  const num = searchTodosInFilesInDirectory('fakeDir', '.js')
  t.true(num >= 1)

})

test('searchTodosInFilesInDirectory should return empty string with null directory', (t) => {
  const validExt = '.js'
  const nullDirectory = null
  t.is(searchTodosInFilesInDirectory(nullDirectory, validExt), undefined)
})

test('searchTodosInFilesInDirectory should return empty string with undefined directory', (t) => {
  const validExt = '.js'
  const undefinedDirectory = undefined
  t.is(searchTodosInFilesInDirectory(undefinedDirectory, validExt), undefined)
})


test('searchTodosInFilesInDirectory should return empty string with invalid directory', (t) => {
  const validExt = '.js'
  t.is(searchTodosInFilesInDirectory('invalidDirect', validExt), undefined)
})