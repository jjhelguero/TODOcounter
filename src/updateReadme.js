const fs = require('fs')
const debug = require('debug')('updateReadMeTodoCounter')
var dayjs = require('dayjs')


// const todoRowRegex = /(?<todoRow>\|<date\d+>(\d{2}\/\d{2}\/\d{2})?\|<todoCounter\d+>(\d+)?\|)/gi

function extractTodoRows(readMe) {
  debug('Extracting todo rows')
  // const todoRowRegex = /\|<date\d+>(\d{2}\/\d{2}\/\d{2})?\|<todoCounter\d+>(\d+)?\|/gi
  const todoRowRegex = /\|<date>(\d{2}\/\d{2}\/\d{2})?\|<todoCounter>(\d+)?\|/gi
  const matchedRows = (readMe || '').match(todoRowRegex) || []
  debug(`Found ${matchedRows.length} matches`)

  return matchedRows
}

function updateTodoTable(rowArray, todoCount) {
  debug('Updating todo table')
  const d = new Date()
  const date = dayjs(d).format('MM/DD/YY')
  const newRow = `|<date>${date}|<todoCounter>${todoCount}|`
  rowArray.push(newRow)

  console.log(rowArray)

  // rowArray.shift()

  debug('Todo table updated!')
}

function updateReadMeTodoCounter(tcounter) {
  const readmeFile = 'README.md'

  fs.readFile(readmeFile, 'utf-8', function (err, data) {
    if (err) throw err;

    const todoRows = extractTodoRows(data)

    updateTodoTable(todoRows, tcounter)

    // TODO update
    // console.log({ todoRows })
    // console.log(
    //   `Found todo count: ${tcounter}\nREADME.md todo count: ${readMeTodoCounter}`,
    // );

    //   // only update todo counter if current README.md todo DOES NOT match todos found
    //   if (~~readMeTodoCounter !== tcounter) {
    //     // find and replace todo counter in README file
    //     var newValue = data.replace(
    //       currentTodoRegex,
    //       `Current TODO counter: ${tcounter}`,
    //     );

    //     console.log(
    //       `Updating ${readmeFile} file with updated todo count of ${tcounter}`,
    //     );
    //     fs.writeFile(readmeFile, newValue, 'utf-8', function (err, data) {
    //       if (err) throw err;
    //       console.log('TODO counter updated!');
    //     });
    //   } else {
    //     console.log('No changes in TODO counter.');
    //   }
  })
}

function searchForTodos(results) {
  let TODOcounter = 0;
  for (var result in results) {
    var res = results[result];
    console.log(`found "${res.matches[0]}" ${res.count} times in "${result}"`);

    TODOcounter += res.count;
  }
  udpateReadMeTodoCounter(TODOcounter);
}

updateReadMeTodoCounter(2)
module.exports = updateReadMeTodoCounter
