const fs = require('fs')
const path = require('path')
const debug = require('debug')('utils')

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

;(module.exports = getFilesInDirectory)