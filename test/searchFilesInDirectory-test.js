const test = require('ava')
const mock = require('mock-fs')
const getFilesInDirectory = require('../src/searchFilesInDirectory')
const searchFilesInDirectory = require('../src/searchFilesInDirectory')

test('getFilesInDirectory returns number of files', t => {
    mock({
        'fakeDir/mockFile1.js': '//todo\n// todo',
    })
    t.true(typeof getFilesInDirectory('fakeDir', '.js') == 'number')
})

test('getFilesInDirectory should return empty string when nullish value', t => {
    const validExt = '.js'
    const nullDirectory = null
    const undefinedDirectory = undefined
    t.is(getFilesInDirectory(nullDirectory, validExt), undefined)
    t.is(getFilesInDirectory(undefinedDirectory, validExt), undefined)
    t.is(getFilesInDirectory('invalidDirect', validExt), undefined)
})

test('searchFilesInDirectory returns a number', t => {
    mock({
        'fakeDir/mockFile1.js': '//todo\n// todo',
    })
    t.true(typeof searchFilesInDirectory('fakeDir', '.js') == 'number')
})

test('searchFilesInDirectory should return empty string when nullish value', t => {
    const validExt = '.js'
    const nullDirectory = null
    const undefinedDirectory = undefined
    t.is(searchFilesInDirectory(nullDirectory, validExt), undefined)
    t.is(searchFilesInDirectory(undefinedDirectory, validExt), undefined)
    t.is(searchFilesInDirectory('invalidDirect', validExt), undefined)
})