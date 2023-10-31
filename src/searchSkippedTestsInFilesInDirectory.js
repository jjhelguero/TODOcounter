const fs = require('fs')
const util = require('util')
const { getFilesInDirectory, getCount } = require('./utils')
const debug = require('debug')('todo-counter')

const skippedTestRegex = /\.skip/gi

/**
 * Function to get total count of todos within files matching ext within
 * directory(icluding subdirectories)
 * @param {String} dir directory string
 * @param {String} ext file extenstion string
 * @returns {Number} returns total todo count in files
 */
function searchSkippedTestsInFilesInDirectory(dir, ext) {
  if (!fs.existsSync(dir)) {
    debug(`Specified directory: ${dir} does not exist`)
    return
  }

  debug(`Searching for todos in ${dir}`)

  const files = getFilesInDirectory(dir, ext)

  debug('Files found: \n' + util.inspect(files, { maxArrayLength: null }))

  return getCount(files, skippedTestRegex)
}

module.exports = searchSkippedTestsInFilesInDirectory
