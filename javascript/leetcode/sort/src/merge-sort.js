/**
 * 归并排序
 */

module.exports = mergeSort 

function mergeSort (array = []) {
  const length = array.length
  if(length < 2) return array
  // 分
  const mid = Math.floor(length / 2)
  const left = array.slice(0, mid)
  const right = array.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
} 

function merge (left = [], right = []) {
  const tmp = []

  while(left.length && right.length) {
    if(left[0] <= right[0]) {
      tmp.push(left.shift())
    } else {
      tmp.push(right.shift())
    }
  }

  while(left.length) {
    tmp.push(left.shift())
  }
  while(right.length) {
    tmp.push(right.shift())
  }

  return tmp
}

console.log(mergeSort([10, 2, 6, 3, 59, 44, 16, 20, 33, 4, 8, 19, 10, 28]))

/**
 * 
 * @param {Number[]} array 
 */
function mergeSort2 (array = []) {
  if(!array.length || array.length === 1) return array
  const mid = Math.ceil((array.length) / 2)
  const left = mergeSort2( array.slice( 0, mid ) )
  const right = mergeSort2( array.slice( mid ) )
  return merge2(left, right)
}

function merge2 (left, right) {
  const result = []
  while(left.length && right.length) {
    if(left[0] < right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while(left.length) {
    result.push(left.shift())
  }

  while(right.length) {
    result.push(right.shift())
  }

  return result
}

console.log( mergeSort2( [ 10, 2, 6, 3, 59, 44, 16, 20, 33, 4, 8, 19, 10, 28 ] ) )