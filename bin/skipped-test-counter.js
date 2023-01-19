#!/usr/bin/env node

const debug = require('debug')('todo-counter')
const { lazyAss } = require('lazy-ass')
const is = require('check-more-types')

require('simple-bin-help')({
  minArguments: 2,
  packagePath: __dirname + '/../package.json',
  help: 'use    : todo-counter <directory> <file extension>\n' +
    'example: todo-counter "tests/files" ".js"'
})

const directory = process.argv[2]
const fileExt = process.argv.slice(3)
debug('directory and file extension: %s - %o', directory, fileExt)

const skippedTestCounter = require('..').skippedTestCounter
lazyAss(is.fn(skippedTestCounter), 'expected function', skippedTestCounter)
skippedTestCounter(directory, fileExt)
