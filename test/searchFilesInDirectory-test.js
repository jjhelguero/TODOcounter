const test = require('ava')
const mock = require('mock-fs')
const getFilesInDirectory = require('../src/searchTodosInFilesInDirectory')
const searchTodosInFilesInDirectory = require('../src/searchTodosInFilesInDirectory')

test('getFilesInDirectory returns number of files', (t) => {
    mock({
        'fakeDir': {
            'mockFile1.js': '//todo\n// todo',
            'empty-dir': {},
            'sub': {
                'mockFile2.js': '// todo'
            },
            'mockFile.java': ''
        }
    })
    t.true(typeof getFilesInDirectory('fakeDir', '.js') === 'number')
})

test('getFilesInDirectory should return empty string when nullish value', (t) => {
    const validExt = '.js'
    const nullDirectory = null
    const undefinedDirectory = undefined
    t.is(getFilesInDirectory(nullDirectory, validExt), undefined)
    t.is(getFilesInDirectory(undefinedDirectory, validExt), undefined)
    t.is(getFilesInDirectory('invalidDirect', validExt), undefined)
})

test('searchTodosInFilesInDirectory returns a number', (t) => {
    mock({
        'fakeDir': {
            'mockFile1.js': '//todo\n// todo',
            'empty-dir': {},
            'sub': {
                'mockFile2.js': '// todo'
            },
            'mockFile.java': ''
        }
    })
    t.true(typeof searchTodosInFilesInDirectory('fakeDir', '.js') === 'number')
})

test('searchTodosInFilesInDirectory should return empty string when nullish value', (t) => {
    const validExt = '.js'
    const nullDirectory = null
    const undefinedDirectory = undefined
    t.is(searchTodosInFilesInDirectory(nullDirectory, validExt), undefined)
    t.is(searchTodosInFilesInDirectory(undefinedDirectory, validExt), undefined)
    t.is(searchTodosInFilesInDirectory('invalidDirect', validExt), undefined)
})
