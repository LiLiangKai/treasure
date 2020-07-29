/** 插入排序 */
function insertionSort (array) {
  for(let i=1; i<array.length; i++) {
    const current = array[i]
    let prevIdx = i - 1
    while(prevIdx >= 0 && array[prevIdx] > current) {
      array[prevIdx+1] = array[prevIdx]
      prevIdx--
    }
    array[prevIdx+1] = current
  }
  return array
}

console.log( insertionSort( [ 29, 10, 14, 37, 10 ] ) )
