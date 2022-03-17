const la = require('lazy-ass')
const is = require('check-more-types')
const searchFilesInDirectory = require('./searchFilesInDirectory')
const udpateReadMeTodoCounter = require('./updateReadme')

function findAndUpdateTodoCounter(dir, ext) {
  la(is.unemptyString(dir), 'expect search directory', dir)
  la(is.unemptyString(ext), 'expect file filter', ext)

  const currentTodos = searchFilesInDirectory(dir, ext)

  la(is.number(currentTodos), 'expect todo counter to be a number', currentTodos)
  udpateReadMeTodoCounter(currentTodos)
}
findAndUpdateTodoCounter('test/files', '.js')
module.exports = { findAndUpdateTodoCounter }
