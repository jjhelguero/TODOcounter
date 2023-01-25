const { lazyAss } = require('lazy-ass')
const is = require('check-more-types')
const check = require('check-more-types')
const searchTodosInFilesInDirectory = require('./searchTodosInFilesInDirectory')
const maybeUpdateReadMeCounter  = require('./readmeTableUpdates/updateReadme')
const { COUNT_TYPE } = require('./readmeTableUpdates/utils')

function todoCounter (dir, ext) {
  lazyAss(is.unemptyString(dir), 'expect search directory', dir)
  lazyAss(check.arrayOf(check.unemptyString, ext), 'expect file filter', ext)

  const currentTodos = searchTodosInFilesInDirectory(dir, ext)

  lazyAss(
    is.number(currentTodos),
    'expect todo counter to be a number',
    currentTodos
  )
  maybeUpdateReadMeCounter(currentTodos, COUNT_TYPE.TODO.typeCounter)
}

function skippedTestCounter (dir, ext) {
  lazyAss(is.unemptyString(dir), 'expect search directory', dir)
  lazyAss(check.arrayOf(check.unemptyString, ext), 'expect file filter', ext)

  const skippedTests = searchTodosInFilesInDirectory(dir, ext)

  lazyAss(
    is.number(skippedTests),
    'expect skipped tests to be a number',
    skippedTests
  )
  maybeUpdateReadMeCounter(skippedTests, COUNT_TYPE.SKIP.type)
}

module.exports = { todoCounter, skippedTestCounter }
