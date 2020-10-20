/** 选择排序 */

module.exports = selectionSort

function selectionSort (array) {
  for(let i=0; i<array.length-1; i++) {
    let n = i
    for(let j=i+1; j<array.length; j++) {
      if(array[j] < array[n]) {
        n = j
      }
    }
    const t = array[n]
    array[n] = array[i]
    array[i] = t
  }
  return array
}

// console.log( selectionSort( [ 29, 10, 14, 37, 10 ] ) )