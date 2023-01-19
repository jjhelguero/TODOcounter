const { lazyAss } = require('lazy-ass')
const is = require('check-more-types')
const check = require('check-more-types')
const searchFilesInDirectory = require('./searchFilesInDirectory')
const udpateReadMeTodoCounter = require('./updateReadme')

function todoCounter(dir, ext) {
  lazyAss(is.unemptyString(dir), 'expect search directory', dir)
  lazyAss(check.arrayOf(check.unemptyString, ext), 'expect file filter', ext)

  const currentTodos = searchFilesInDirectory(dir, ext)

  lazyAss(
    is.number(currentTodos),
    'expect todo counter to be a number',
    currentTodos,
  )
  udpateReadMeTodoCounter(currentTodos)
}

function skippedTestCounter(dir, ext) {
  lazyAss(is.unemptyString(dir), 'expect search directory', dir)
  lazyAss(check.arrayOf(check.unemptyString, ext), 'expect file filter', ext)

  const skippedTests = searchFilesInDirectory(dir, ext)

  lazyAss(
    is.number(skippedTests),
    'expect skipped tests to be a number',
    skippedTests,
  )
  udpateReadMeTodoCounter(skippedTests)
}

module.exports = { todoCounter, skippedTestCounter }
