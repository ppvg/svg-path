var test = require('tape')
var Path = require('../lib/Path')

test('ignore command', function (t) {
  var path = new Path([
    { type: 'M', relative:false, x:0, y:0 },
    { type: 'L', relative:false, x:100, y:100 },
    { type: 'Z' }
  ])
  path.filterMap(function (command) {
    if (command.type === 'M')
      return undefined
    if (command.type === 'L')
      return null
  })
  t.same(path.content, [
    { type: 'M', relative:false, x:0, y:0 },
    { type: 'L', relative:false, x:100, y:100 },
    { type: 'Z' }
  ])
  t.end()
})

test('remove command', function (t) {
  var path = new Path([
    { type: 'M', relative:false, x:0, y:0 },
    { type: 'L', relative:false, x:100, y:100 },
    { type: 'Z' }
  ])
  path.filterMap(function (command) {
    if (command.type === 'L')
      return false
  })
  t.same(path.content, [
    { type: 'M', relative:false, x:0, y:0 },
    { type: 'Z' }
  ])
  t.end()
})

test('change command', function (t) {
  var path = new Path([
    { type: 'M', relative:false, x:0, y:0 },
    { type: 'Z' }
  ])
  path.filterMap(function (command) {
    if (command.type === 'M')
      command.x = 42
  })
  t.same(path.content, [
    { type: 'M', relative:false, x:42, y:0 },
    { type: 'Z' }
  ])
  t.end()

})

test('replace command', function (t) {
  var path = new Path([
    { type: 'M', relative:false, x:0, y:0 },
    { type: 'L', relative:false, x:100, y:100 },
    { type: 'Z' }
  ])
  path.filterMap(function (command) {
    if (command.type === 'L')
      return [
        { type: 'H', relative:false, x:100 },
        { type: 'V', relative:false, y:100 }
      ]
  })
  t.same(path.content, [
    { type: 'M', relative:false, x:0, y:0 },
    { type: 'H', relative:false, x:100 },
    { type: 'V', relative:false, y:100 },
    { type: 'Z' }
  ])
  t.end()
  t.end()
})
