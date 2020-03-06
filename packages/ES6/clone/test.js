const { clone, clone2, clone3 } = require('./deepClone')

const target = {
  key: 'abc',
  type: 'div',
  text: 'this is a text',
  name: 'test',
  style: {
    fontSize: '16px',
    color: '#666',
  },
  children: [1, 2, 3, { text: 'text' }],
}

target.parent = target

// console.time('1')
// const r = clone(target)
// console.log(r)
// console.timeEnd('1')

// console.log('\n----------------\n')

// console.time( '2' )
// const r2 = clone2( target )
// console.log( r )
// console.timeEnd( '2' )

console.time( '3' )
const r3 = clone3( target )
console.log( r )
console.timeEnd( '3' )