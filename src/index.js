const la = require('lazy-ass')
const searchFilesInDirectory = require('./searchFilesInDirectory')

function findAndUpdateTodoCounter(dir, ext) {
  la(is.unemptyString(dir), 'expect search directory', dir)
  la(is.unemptyString(ext), 'expect file filter', ext)

  const currentTodos = searchFilesInDirectory(dir, ext)
  udpateReadMeTodoCounter(currentTodos)
}
module.exports = { findAndUpdateTodoCounter }