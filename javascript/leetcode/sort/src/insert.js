/** 插入排序 */

module.exports = insertSort

function insertSort (array) {
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

// console.log( insertSort( [ 29, 10, 14, 37, 10 ] ) )

function  insertSort2 (array = []) {
  const length = array.length
  for(let i=1; i<length; i++) {
    const elem = array[i]
    let prevIndex = i - 1
    while(prevIndex >= 0 && array[prevIndex] > elem) {
      array[prevIndex+1] = array[prevIndex]
      prevIndex --
    }
    array[prevIndex+1] = elem
  }
  return array
}

// console.log( insertSort2( [ 29, 10, 14, 37, 10 ] ))

function insertSort3 (array = []) {
  for(let i=1; i<array.length; i++) {
    const elem = array[i]
    let prevIndex = i - 1
    while(prevIndex >= 0 && array[prevIndex] > elem) {
      array[prevIndex+1] = array[prevIndex]
      prevIndex--
    }
    array[prevIndex+1] = elem
  }
  return array
}

// console.log( insertSort3( [ 29, 10, 14, 37, 10, 33, 54, 5 ] ) )

function insertSort4 (array = []) {
  for(let i=1; i<array.length; i++) {
    const elem = array[i]
    let prevIndex = i-1
    while(prevIndex>=0 && array[prevIndex] > elem) {
      array[prevIndex+1] = array[prevIndex]
      prevIndex--
    }
    array[prevIndex+1] = elem
  }
  return array
}

// console.log(insertSort4([30, 5, 6, 22, 16, 70, 50]))

function insertSort5(array = []) {
  for(let i=1; i<array.length; i++) {
    const elem = array[i]
    let prevIndex = i-1
    while(prevIndex>=0 && array[prevIndex] >= elem) {
      array[prevIndex+1] = array[prevIndex]
      prevIndex--
    }
    array[prevIndex+1] = elem
  }
  return array
}

console.log(insertSort5([30, 5, 6, 22, 16, 70, 50]))