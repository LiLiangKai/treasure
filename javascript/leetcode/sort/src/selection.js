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

function selectSort (array = []) {
  const length = array.length
  for(let i=0; i<length-1; i++) {
    let n = i
    for(let j=i+1; j<length; j++) {
      if(array[j] < array[n]) {
        n = j
      }
    }
    [array[i], array[n]] = [array[n], array[i]]
  }
  return array
}

function select (array) {
  const length = array.length
  for(let i=0; i<length-1; i++) {
    let cur = i
    for(let j=i+1; j<length; j++) {
      if(array[j] < array[cur]) {
        cur = j
      }
    }
    [array[i], array[cur]] = [array[cur], array[i]]
  }
  return array
}

function select (array) {
  const length = array.length
  for(let i=0; i<length-1; i++) {
    let cur = i
    for(let j=i+1; j<length; j++) {
      if(array[j] < array[cur]) {
        cur = j
      }
    }
    [array[i], array[cur]] = [array[cur], array[i]]
  }
  return array
}