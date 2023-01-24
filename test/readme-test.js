const test = require('ava')
const mock = require('mock-fs')
const { extractTableFromReadme } = require('../src/readmeTableUpdates/utils')

test('extractTableFromReadme for todoCounter returns a number', (t) => {
    mock({ 
        'mockFile1.md': '| <date>01/01/01 | <todoCounter>1  |',
    })
    t.true(typeof extractTableFromReadme('mockFile1.md', 'todo') === 'number')
})

test('extractTableFromReadme matches 2 todo counter rows', (t) => {
    mock({ 
        'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |`,
    })
    t.true(extractTableFromReadme('mockFile1.md', 'todo') === 2)
})