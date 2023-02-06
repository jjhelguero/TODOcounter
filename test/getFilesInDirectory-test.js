const test = require('ava')
const mock = require('mock-fs')
const { getFilesInDirectory } = require('../src/utils')

const happyPathMockDir = {
  'mockFile1.js': '//todo\n// todo',
  'mockFile1.ts': '//todo\n// todo',
  'empty-dir': {},
  sub: {
    'mockFile2.js': '// todo',
    'mockFile2.ts': '// todo',
  },
  'mockFile.java': '',
}

test('getFilesInDirectory returns an object ', (t) => {
  mock({
    fakeDir: happyPathMockDir,
  })
  const actual = typeof getFilesInDirectory('fakeDir', '.js')
  const expected = 'object'
  t.true(actual === expected)
})

test('getFilesInDirectory returns 4 files', (t) => {
  mock({
    fakeDir: happyPathMockDir,
  })
  const actual = getFilesInDirectory('fakeDir', '[.js,.ts]').length
  const expected = 4
  t.true(actual == expected)
})

test('getFilesInDirectory should return empty string with null directory', (t) => {
  const validExt = '.js'
  const nullDirectory = null
  const actual = getFilesInDirectory(nullDirectory, validExt)
  t.is(actual, undefined)
})

test('getFilesInDirectory should return empty string with undefined directory', (t) => {
  const validExt = '.js'
  const undefinedDirectory = undefined
  const actual = getFilesInDirectory(undefinedDirectory, validExt)
  t.is(actual, undefined)
})

test('getFilesInDirectory should return empty string with invalid directory', (t) => {
  const validExt = '.js'
  const actual = getFilesInDirectory('invalidDirect', validExt)
  t.is(actual, undefined)
})
