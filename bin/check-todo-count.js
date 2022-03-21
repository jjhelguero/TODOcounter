#!/usr/bin/env node

const debug = require('debug')('check-todo-count')
const la = require('lazy-ass')
const is = require('check-more-types')
const join = require('path').join

require('simple-bin-help')({
    minArguments: 2,
    packagePath: join(__dirname, '..', 'package.json'),
    help: 'use    : check-todo-count <directory> <file extension>\n' +
        'example: check-todo-count "tests/files" ".js"'
})

const directory = process.argv[2]
const fileExt = process.argv.slice(3)
debug('directory and file extension: %s - %o', directory, fileExt)

const countTodos = require('..').countTodos
la(is.fn(countTodos), 'expected function', countTodos)
countTodos(directory, fileExt)
