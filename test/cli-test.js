const test = require('ava')
const execa = require('execa-wrap')

test('runs todo counter for demo directory and ".js" extension', async (t) => {
  t.plan(1)
  await execa('node', ['./bin/count', '--todo', 'demo', '.js'], {
    filter: ['code', 'stdout'],
  })
  t.true(true)
})

test('runs skipped tests counter for demo directory and ".js" extension', async (t) => {
  t.plan(1)
  await execa('node', ['./bin/count', '--skipped', 'demo', '.js'], {
    filter: ['code', 'stdout'],
  })
  t.true(true)
})
