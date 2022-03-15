const test = require('ava')
const searchFilesInDirectory = require('../src/searchFilesInDirectory')

test('returns number', t => {
    const todoCount = searchFilesInDirectory('test/files', '.js')
    t.true(typeof todoCount == 'number', 'todoCount returns a number')
})