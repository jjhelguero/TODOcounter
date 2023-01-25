const test = require('ava')
const dayjs = require('dayjs')
const mock = require('mock-fs')
const fs = require('fs')
const {createNewReadMe, COUNT_TYPE} = require('../src/readmeTableUpdates/utils')

test('createNewReadMe creates README Text', t => {
     mock({ 
        'mockFile1.md': `
        | <date>01/01/01 | <todoCounter>1  |
        | <date>02/02/02 | <todoCounter>2  |
        | <date>03/03/03 | <todoCounter>3  |
        | <date>04/04/04 | <todoCounter>4  |
        `
    })
    const data = fs.readFileSync('mockFile1.md').toString()
    const oldTable = [
        '| <date>01/01/01 | <todoCounter>1  |',
        '| <date>02/02/02 | <todoCounter>2  |',
        '| <date>03/03/03 | <todoCounter>3  |',
        '| <date>04/04/04 | <todoCounter>4  |'
    ]
    const count = 10
    const d = new Date()
    const date = dayjs(d).format('MM/DD/YY')
    const expectedNewReadMe = `| Date | ${COUNT_TYPE.TODO.type} Count |
| :---:| :---:|
${oldTable[0]}
${oldTable[1]}
${oldTable[2]}
${oldTable[3]}
| <date>${date} | <todoCounter>${count} |
`
    const newTable = createNewReadMe(data, oldTable, count, COUNT_TYPE.TODO.type)
    t.deepEqual(newTable, expectedNewReadMe)
})