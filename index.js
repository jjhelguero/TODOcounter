// const fs = require('fs')
// const path = require('path')
// // path = 'Files'
// fs.readdir('Files', (err, files) => {
//     if (err) {
//         console.log(err)
//     }

//     const filteredFiles = files.filter((file) => { return file.match(/.js/) })
//     console.log(filteredFiles)
// })

var findInFiles = require('find-in-files');

findInFiles
    .find({ term: /\/\/\s?todo/, flags: 'ig' }, 'Test', '.js$')
    .then(function (results) {
        let TODOcounter = 0;
        for (var result in results) {
            var res = results[result];
            console.log(
                'found "' +
                res.matches[0] +
                '" ' +
                res.count +
                ' times in "' +
                result +
                '"',
            );

            TODOcounter += res.count;
        }
        console.log('Todo counter: ' + TODOcounter);
    });


  // TODO read README.md, find and replace TODO counter