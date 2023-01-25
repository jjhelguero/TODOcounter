const test = require('ava')
const dayjs = require('dayjs')
const mock = require('mock-fs')
const fs = require('fs')
const {createNewReadMe, COUNT_TYPE, stringErrorMessage, arrayErrorMessage, numberErrorMessage} = require('../src/readmeTableUpdates/utils')

test('createNewReadMe creates README Text', t => {
     mock({ 
        'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`
    })
    const data = fs.readFileSync('mockFile1.md').toString()
    const oldTable = data.split(/\n        /)
    const formattedOldTable = oldTable.toString().replace(/\|,/g, '|\n')
    const count = 10
    const d = new Date()
    const date = dayjs(d).format('MM/DD/YY')
    const expectedNewReadMe = `| Date | ${COUNT_TYPE.TODO.type} Count |
| :---:| :---:|
${formattedOldTable}
| <date>${date} | <todoCounter>${count} |
`
    const newTable = createNewReadMe(data, oldTable, count, COUNT_TYPE.TODO.type)
    t.deepEqual(newTable, expectedNewReadMe)
})

test('createNewReadMe creates README Text with table already having 10 entries', t => {
     mock({ 
        'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |
        | <date>05/05/05 | <todoCounter>5  |
        | <date>06/06/06 | <todoCounter>6  |
        | <date>07/07/07 | <todoCounter>7  |
        | <date>08/08/08 | <todoCounter>8  |
        | <date>09/09/09 | <todoCounter>9  |
        | <date>10/10/10 | <todoCounter>10 |`
    })
    const data = fs.readFileSync('mockFile1.md').toString()
    const oldTable = data.split(/\n        /)
    oldTable.shift()
    const formattedOldTable = oldTable.toString().replace(/\|,/g, '|\n')
    const count = 100
    const d = new Date()
    const date = dayjs(d).format('MM/DD/YY')
    const expectedNewReadMe = `| Date | ${COUNT_TYPE.TODO.type} Count |
| :---:| :---:|
${formattedOldTable}
| <date>${date} | <todoCounter>${count} |
`
    const newTable = createNewReadMe(data, oldTable, count, COUNT_TYPE.TODO.type)
    t.deepEqual(newTable, expectedNewReadMe)
})

test('createNewReadMe throws an error when data is not a string', t=> {
     mock({ 
        'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`
    })
    const data = fs.readFileSync('mockFile1.md').toString()
    const oldTable = data.split(/\n        /)
    const badData = {}
    const count = 100
    const errorMessage = stringErrorMessage(badData)
    const error = t.throws(() => createNewReadMe(badData, oldTable, count, COUNT_TYPE.TODO.type))
    t.is(error.message, errorMessage);
})

test('createNewReadMe throws an error when old table is not an array', t=> {
    mock({ 
        'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`
    })
    const data = fs.readFileSync('mockFile1.md').toString()
    const badOldTable = ''
    const count = 10
    const errorMessage = arrayErrorMessage(badOldTable)
    const error = t.throws(() => createNewReadMe(data, badOldTable, count, COUNT_TYPE.TODO.type))
    t.is(error.message, errorMessage);
})

test('createNewReadMe throws an error when count is not a number', t=> {
     mock({ 
        'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`
    })
    const data = fs.readFileSync('mockFile1.md').toString()
    const oldTable = data.split(/\n        /)
    const badCount = '100'
    const errorMessage = numberErrorMessage(badCount)
    const error = t.throws(() => createNewReadMe(data, oldTable, badCount, COUNT_TYPE.TODO.type))
    t.is(error.message, errorMessage);
})

test('createNewReadMe throws an error when countType is not a string', t=> {
     mock({ 
        'mockFile1.md': `| <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |`
    })
    const data = fs.readFileSync('mockFile1.md').toString()
    const oldTable = data.split(/\n        /)
    const count = 100
    const badCountType = null
    const errorMessage = stringErrorMessage(badCountType)
    const error = t.throws(() => createNewReadMe(data, oldTable, count, badCountType))
    t.is(error.message, errorMessage);
})