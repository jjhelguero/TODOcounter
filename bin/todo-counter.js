#!/usr/bin/env node

const debug = require('debug')('todo-counter')
const la = require('lazy-ass')
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

const todoCounter = require('..').todoCounter
la(is.fn(todoCounter), 'expected function', todoCounter)
todoCounter(directory, fileExt)
