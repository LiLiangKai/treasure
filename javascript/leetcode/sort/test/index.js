const bubbleSort = require('../src/bubble')
const insertSort = require('../src/insert')
const mergeSort = require('../src/merge-sort')
const selectSort = require('../src/selection')
const quickSort = require( '../src/quick-sort' )
const quickSort2 = require( '../src/quick-sort2' )

main()

function main() {
  const rArray = randomArray(1000)
  console.time('bubble')
  bubbleSort(rArray)
  console.timeEnd('bubble') // 100ms

  console.time( 'insert' )
  insertSort( rArray )
  console.timeEnd( 'insert' ) // 1.5ms

  console.time( 'select' )
  selectSort( rArray )
  console.timeEnd( 'select' ) // 38ms

  console.time( 'merge' )
  mergeSort( rArray )
  console.timeEnd( 'merge' ) // 9ms

  console.time( 'quick' )
  quickSort( rArray )
  console.timeEnd( 'quick' ) // 9ms

  console.time( 'quick2' )
  quickSort2( rArray )
  console.timeEnd( 'quick2' ) // 9ms
}

function randomArray (count = 100) {
  const array = []
  for(let i=0; i<count; i++) {
    const rnum = Math.ceil(Math.random() * count)
    array.push(rnum)
  }
  return array
}

/*
|--- sort name ---|--- 10 ---|--- 100 ---|--- 1000 ---|--- 10000 ---|--- 100000 ---|        
     bubble         0.104ms     0.416ms       2.702ms     115.57ms       14.453s
     insert         0.032ms     0.043ms       0.089ms     1.54ms         1.633ms
     select         0.042ms     0.333ms       2.747ms     51.536ms       4.736s
     merge          0.176ms     0.241ms       1.593ms     11,114ms       677.838ms
     quick          0.168ms     0.281ms       1.285ms     5.113ms        17.608ms
     quick2         0.129ms     0.22ms        2.084ms     8.564ms        52.315ms
*/