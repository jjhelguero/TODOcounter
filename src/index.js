var findInFiles = require('find-in-files');
var fs = require('fs');

const readmeFile = 'README.md';
const directory = 'test'
const fileFilter = '.js$'
const term = /\/\/\s?todo/
const flags = 'ig'

let TODOcounter = 0;

findInFiles
  .find({ term, flags }, directory, fileFilter)
  .then(function (results) {
    console.log('Searching for TODOs\n');
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

    fs.readFile(readmeFile, 'utf-8', function (err, data) {
      if (err) throw err;

      const readMeTodoCounter = data.match(
        /current\stodo\scounter:\s(?<todocounter>\d)/i,
      )?.groups?.todocounter

      console.log(`\nFound todo count: ${TODOcounter}\nCurrent todo count(README.md): ${readMeTodoCounter}`)

      // only update todo counter if current README.md todo DOES NOT match todos found
      if (~~readMeTodoCounter == TODOcounter) {
        // find and replace todo counter in README file
        var newValue = data.replace(
          /current\stodo\scounter:\s\d/i,
          `Current TODO counter: ${TODOcounter}`,
        );

        console.log(
          `\nUpdating ${readmeFile} file with updated todo count of ${TODOcounter}\n`,
        );
        fs.writeFile(readmeFile, newValue, 'utf-8', function (err, data) {
          if (err) throw err;
          console.log('TODO counter updated!\n');
        });
      } else {
        console.log('\nNo changes in TODO counter.');
      }
    });
  });
