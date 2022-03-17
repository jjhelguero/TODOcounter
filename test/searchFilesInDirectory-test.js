const test = require('ava')
const getTodoCount = require('../src/searchFilesInDirectory')
const getFilesInDirectory = require('../src/searchFilesInDirectory')

test('getFilesInDirectory returns number of files', t => {
    t.true(typeof getFilesInDirectory('test/files', '.js') == 'number')
})

test('getFilesInDirectory should return empty string when nullish value', t => {
    const validExt = '.js'
    const nullDirectory = null
    const undefinedDirectory = undefined
    t.is(getFilesInDirectory(nullDirectory, validExt), undefined)
    t.is(getFilesInDirectory(undefinedDirectory, validExt), undefined)
    t.is(getFilesInDirectory('invalidDirect', validExt), undefined)
})
