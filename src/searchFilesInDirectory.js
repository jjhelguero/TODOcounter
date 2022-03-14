const fs = require('fs')
const path = require('path');
const util = require('util')

const debug = require('debug')('filterFiles')

function getFilesInDirectory(dir, ext) {
    if (!fs.existsSync(dir)) {
        console.log(`Specified directory: ${dir} does not exist`)
        return
    }

    let files = []
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file)
        const stat = fs.lstatSync(filePath)

        if (stat.isDirectory()) {
            const nestedFiles = getFilesInDirectory(filePath, ext)
            files = files.concat(nestedFiles)
        } else {
            if (path.extname(file) === ext) {
                files.push(filePath)
            }
        }
    })
    return files
}

function getTodoCount(files) {
    const regex = /\/{2}\s?todo\s?/
    const flags = 'ig'
    let todoCounter = 0

    files.forEach(file => {
        // if (err) throw err
        const fileContent = fs.readFileSync(file, { encoding: 'utf-8' })
        const matcher = new RegExp(regex, flags)
        const numMatches = (fileContent.match(matcher) || []).length

        debug(`Matcher is: ${matcher}`)


        if (numMatches != 0) {
            debug(`Found ${numMatches} todo comment(s) in ${file}`)
            todoCounter += numMatches
            debug(`Todo count: ${todoCounter}`)
        } else {
            debug(`Found ${numMatches} todo comment(s) in ${file}`)
        }
    })
    return todoCounter
}

function searchFilesInDirectory(dir, ext) {
    if (!fs.existsSync(dir)) {
        console.log(`Specified directory: ${dir} does not exist`);
        return;
    }

    const files = getFilesInDirectory(dir, ext);

    console.log('Files found: \n' + util.inspect(files, { maxArrayLength: null }))


    return getTodoCount(files)
}

searchFilesInDirectory('test/', '.js')
module.exports = searchFilesInDirectory