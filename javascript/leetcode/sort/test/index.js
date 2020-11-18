const bubbleSort = require('../src/bubble')
const insertSort = require('../src/insert')
const mergeSort = require('../src/merge-sort')
const selectSort = require('../src/selection')
const quickSort = require('../src/quick-sort')

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
}

function randomArray (count = 1000) {
  const array = []
  for(let i=0; i<count; i++) {
    const rnum = Math.ceil(Math.random() * count)
    array.push(rnum)
  }
  return array
}