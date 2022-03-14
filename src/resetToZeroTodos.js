var fs = require('fs');
const directory = 'test';
const flag = 'w+';
const resetContent = '// TODO valid todo'

function isJSFile(file) {
    return file.indexOf('.js') >= 0;
}

fs.readdir(directory, function (err, filesArray) {
    if (err) throw err;

    console.log(`\nReseting todos in ${directory} directory.\n`);
    filesArray
        .filter(isJSFile) // filter by .js files only
        .forEach((file) => {
            const filePath = directory + '/' + file;
            fs.writeFile(filePath, resetContent, { flag }, function (err, data) {
                if (err) throw err;
                console.log(`Reset todos in ${file}`);
            });
        });
});
