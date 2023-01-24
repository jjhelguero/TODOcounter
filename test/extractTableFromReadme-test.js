const test = require('ava')
const mock = require('mock-fs')
const util = require('util')
const { extractTableFromReadme, COUNT_TYPE } = require('../src/readmeTableUpdates/utils')

test('extractTableFromReadme for todoCounter returns a number', (t) => {
    mock({ 
        'mockFile1.md': '| <date>01/01/01 | <todoCounter>1  |',
    })
    t.true(typeof extractTableFromReadme('mockFile1.md', COUNT_TYPE.TODO.type) === 'number')
})

test('extractTableFromReadme matches 2 todo counter rows', (t) => {
    mock({ 
        'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |`,
    })
    t.true(extractTableFromReadme('mockFile1.md', COUNT_TYPE.TODO.type) === 2)
})

test('extractTableFromReadme for skippedCounter returns a number', (t) => {
    mock({ 
        'mockFile1.md': '| <date>01/01/01 | <skippedCounter>1  |',
    })
    t.true(typeof extractTableFromReadme('mockFile1.md', COUNT_TYPE.SKIP.type) === 'number')
})

test('extractTableFromReadme matches 2 skipped counter rows', (t) => {
    mock({ 
        'mockFile1.md': `| <date>01/01/01 | <skippedCounter>1  |
        | <date>02/02/02 | <skippedCounter>2  |`,
    })
    t.true(extractTableFromReadme('mockFile1.md', COUNT_TYPE.SKIP.type) === 2)
})

test('extractTableFromReadme throws error when countType does not match', (t) => {
    mock({ 
        'mockFile1.md': '| <date>01/01/01 | <todoCounter>1  |',
    })
    const incorrectType = 't'
    const errorMessage = `${incorrectType} is not one of ${util.inspect(COUNT_TYPE)}`
    const error = t.throws(
        () => extractTableFromReadme('mockFile1.md', incorrectType))

	t.is(error.message, errorMessage);
})

test('extractTableFromReadme throws error when file is not passed', (t) => {
    mock({ 
        path: {},
    })
    t.throws(() => extractTableFromReadme('path', COUNT_TYPE.TODO.type))
})

