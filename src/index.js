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

function findTodos(fileFilter, searchDirectory) {
  la(is.unemptyString(fileFilter), 'expect file filter', fileFilter)
  la(is.unemptyString(searchDirectory), 'expect search directory', searchDirectory)

  const readmeFile = 'README.md'
  const term = /\/\/\s?todo\s? \w+/
  const flags = 'ig'
  const currentTodoRegex = /current\stodo\scounter:\s(?<todocounter>\d+)/i

  let TODOcounter = 0

  debug(`Searching for todos in ${searchDirectory}`)

  findInFiles
    .find({ term, flags }, searchDirectory, fileFilter)
    .then(function (results) {
      for (var result in results) {
        var res = results[result]
        debug(`found "${res.matches[0]}" ${res.count} times in "${result}"`)

        TODOcounter += res.count
      }

      fs.readFile(readmeFile, 'utf-8', function (err, data) {
        if (err) throw err

        const readMeTodoCounter = data.match(
          currentTodoRegex,
        )?.groups?.todocounter

        debug(`Found todo count: ${TODOcounter}\nCurrent todo count(README.md): ${readMeTodoCounter}`)

        // only update todo counter if current README.md todo DOES NOT match todos found
        if (~~readMeTodoCounter !== TODOcounter) {
          // find and replace todo counter in README file
          var newValue = data.replace(
            currentTodoRegex,
            `Current TODO counter: ${TODOcounter}`,
          )

          debug(`\nUpdating ${readmeFile} file with updated todo count of ${TODOcounter}\n`)
          fs.writeFile(readmeFile, newValue, 'utf-8', function (err, data) {
            if (err) throw err
            debug('TODO counter updated!')
          })
        } else {
          debug('No changes in TODO counter.')
        }
      })
    })

}
module.exports = { findTodos }