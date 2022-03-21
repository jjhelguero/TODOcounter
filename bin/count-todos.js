#!/usr/bin/env node

const debug = require('debug')('count-todos')
const la = require('lazy-ass')
const is = require('check-more-types')

require('simple-bin-help')({
    minArguments: 2,
    packagePath: __dirname + '/../package.json',
    help: 'use    : count-todos <directory> <file extension>\n' +
        'example: count-todos "tests/files" ".js"'
})

const directory = process.argv[2]
const fileExt = process.argv.slice(3)
debug('directory and file extension: %s - %o', directory, fileExt)

const countTodos = require('../src').countTodos
la(is.fn(countTodos), 'expected function', countTodos)
countTodos(directory, fileExt)
