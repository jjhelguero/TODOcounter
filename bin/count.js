#!/usr/bin/env node

const arg = require('arg')
const debug = require('debug')('todo-counter')
const { lazyAss } = require('lazy-ass')
const is = require('check-more-types')

const args = arg({
  // count all todos in passed in director and extension files
  '--todo': String,
  // count all skipped tests in passed in director and extension files
  '--skipped': String,
})
const minArguments = 2
const packagePath = __dirname + '/../package.json'
const replaceMeText = 'REPLACEME-'
let help =
  `use: ${replaceMeText}counter <directory> <file extension>\n` +
  `example: ${replaceMeText}counter "tests/files" ".js"`

function getDirectoryAndGetFileExt(minArgs, pPath, h) {
  require('simple-bin-help')({
    minArguments: minArgs,
    packagePath: pPath,
    help: h,
  })

  const directory = process.argv[3]
  const fileExt = process.argv[4]
  debug('directory and file extension: %s - %o', directory, fileExt)
  return { directory, fileExt }
}
if (args['--todo']) {
  help.replace(replaceMeText, 'todo-')

  const { directory, fileExt } = getDirectoryAndGetFileExt(
    minArguments,
    packagePath,
    help,
  )

  const todoCounter = require('..').todoCounter
  lazyAss(is.fn(todoCounter), 'expected function', todoCounter)
  todoCounter(directory, fileExt)
} else if (args['--skipped']) {
  help.replace(replaceMeText, 'skipped-tests-')

  const { directory, fileExt } = getDirectoryAndGetFileExt(
    minArguments,
    packagePath,
    help,
  )

  const skippedTestCounter = require('..').skippedTestCounter
  lazyAss(is.fn(skippedTestCounter), 'expected function', skippedTestCounter)
  skippedTestCounter(directory, fileExt)
}
