const { lazyAss } = require('lazy-ass')
const is = require('check-more-types')
const check = require('check-more-types')
const searchTodosInFilesInDirectory = require('./searchTodosInFilesInDirectory')
const udpateReadMeTodoCounter = require('./updateReadme')

function todoCounter(dir, ext) {
  lazyAss(is.unemptyString(dir), 'expect search directory', dir)
  lazyAss(check.arrayOf(check.unemptyString, ext), 'expect file filter', ext)

  const currentTodos = searchTodosInFilesInDirectory(dir, ext)

  lazyAss(
    is.number(currentTodos),
    'expect todo counter to be a number',
    currentTodos,
  )
  udpateReadMeTodoCounter(currentTodos)
}

module.exports = { todoCounter }
