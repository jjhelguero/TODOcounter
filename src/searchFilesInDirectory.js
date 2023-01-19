const fs = require('fs')
const path = require('path')
const util = require('util')

const debug = require('debug')('filterFiles')
/**
 * Utility function to get all files in given directory and subdirectories
 * with matching ext and returns an array of strings for matching
 * files
 * @param {String} dir directory string
 * @param {String} ext file extenstion string
 * @returns {Array<string>} returns array of files with matching extension
 */
function getFilesInDirectory(dir, ext) {
  if (!fs.existsSync(dir)) {
    debug(`Specified directory: ${dir} does not exist`)
    return
  }

  let files = []
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.lstatSync(filePath)

    if (stat.isDirectory()) {
      const nestedFiles = getFilesInDirectory(filePath, ext)
      files = files.concat(nestedFiles)
    } else {
      if (path.extname(file) == ext) {
        files.push(filePath)
      }
    }
  })
  return files
}

/**
 * Utility function to get all todo comment counts in passed files array
 * and returns the total count
 * @param {Array<string>} files
 * @returns {Number} returns total todo count in files
 */
function getTodoCount(files) {
  const regex = /\/{2}\s?todo(\s|:)/
  const flags = 'ig'
  let todoCounter = 0

  files.forEach((file) => {
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

/**
 * Function to get total count of todos within files matching ext within
 * directory(icluding subdirectories)
 * @param {String} dir directory string
 * @param {String} ext file extenstion string
 * @returns {Number} returns total todo count in files
 */
function searchTodosInFilesInDirectory(dir, ext) {
  if (!fs.existsSync(dir)) {
    debug(`Specified directory: ${dir} does not exist`)
    return
  }

  debug(`Searching for todos in ${dir}`)

  const files = getFilesInDirectory(dir, ext)

  debug('Files found: \n' + util.inspect(files, { maxArrayLength: null }))

  return getTodoCount(files)
}

;(module.exports = searchTodosInFilesInDirectory),
  getTodoCount,
  getFilesInDirectory
