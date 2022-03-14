const findInFiles = require('find-in-files')
const fs = require('fs')
const la = require('lazy-ass')
const debug = require('debug')('findTodos')

/**
 * Finds todo comments in file(s) and returns the total count
 * @param {String} fileFilter
 * @param {String} searchDirectory
 * @returns {Number} total todo count
 */

function udpateReadMeTodoCounter(TODOcounter) {
  const readmeFile = 'README.md'
  const currentTodoRegex = /current\stodo\scounter:\s(?<todocounter>\d+)/i

  fs.readFile(readmeFile, 'utf-8', function (err, data) {
    if (err) throw err

    const readMeTodoCounter = data.match(
      currentTodoRegex,
    )?.groups?.todocounter

    debug(`Found todo count: ${TODOcounter}\nREADME.md todo count: ${readMeTodoCounter}`)

    // only update todo counter if current README.md todo DOES NOT match todos found
    if (~~readMeTodoCounter !== TODOcounter) {
      // find and replace todo counter in README file
      var newValue = data.replace(
        currentTodoRegex,
        `Current TODO counter: ${TODOcounter}`,
      )

      debug(`Updating ${readmeFile} file with updated todo count of ${TODOcounter}`)
      fs.writeFile(readmeFile, newValue, 'utf-8', function (err, data) {
        if (err) throw err
        debug('TODO counter updated!')
      })
    } else {
      debug('No changes in TODO counter.')
    }
  })
}

function searchForTodos(results) {
  let TODOcounter = 0
  for (var result in results) {
    var res = results[result]
    debug(`found "${res.matches[0]}" ${res.count} times in "${result}"`)

    TODOcounter += res.count
  }
  udpateReadMeTodoCounter(TODOcounter)
}


function findTodosAndUpdateReadmeCounter(fileFilter, searchDirectory) {
  la(is.unemptyString(fileFilter), 'expect file filter', fileFilter)
  la(is.unemptyString(searchDirectory), 'expect search directory', searchDirectory)

  const term = /\/\/\s?todo\s? \w+/
  const flags = 'ig'
  debug(`Searching for todos in ${searchDirectory}`)

  findInFiles
    .find({ term, flags }, searchDirectory, fileFilter)
    .then(searchForTodos)

}
module.exports = { findTodosAndUpdateReadmeCounter }