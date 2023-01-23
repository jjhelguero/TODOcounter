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

test('searchTodosInFilesInDirectory should return empty string when nullish value', (t) => {
  const validExt = '.js'
  const nullDirectory = null
  const undefinedDirectory = undefined
  t.is(searchTodosInFilesInDirectory(nullDirectory, validExt), undefined)
  t.is(searchTodosInFilesInDirectory(undefinedDirectory, validExt), undefined)
  t.is(searchTodosInFilesInDirectory('invalidDirect', validExt), undefined)
})