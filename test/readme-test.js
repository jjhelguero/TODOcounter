const test = require('ava')
const mock = require('mock-fs')
const { extractTableFromReadme } = require('../src/readmeTableUpdates/utils')

test.only('extractTableFromReadme for todoCounter returns a number', (t) => {
    mock({ 
        'mockFile1.md': '| <date>01/01/01 | <todoCounter>1  |',
    })
    t.true(typeof extractTableFromReadme('mockFile1.md', 'todo') === 'number')
})