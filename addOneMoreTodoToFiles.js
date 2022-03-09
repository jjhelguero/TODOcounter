var fs = require('fs');
const directory = 'Test'
const flag = 'a+'
const appendedComment = '\n// TODO valid todo'

function isJSFile(file) {
    return file.indexOf('.js') >= 0
}

fs.readdir(directory, function (err, filesArray) {
    if (err) throw err;

    console.log(`\nFiles in ${directory} to append '${appendedComment}'\n`)
    filesArray
        .filter(isJSFile) // filter by .js files only
        .forEach(file => {
            const filePath = directory + '/' + file
            // TODO console logs are out of sync
            console.log(`Adding valid todo comment to ${filePath} file`)
            fs.writeFile(filePath, appendedComment, { flag }, function (err, data) {
                if (err) throw err;
                console.log('Valid todo comment appended!');
            })
        })
})
