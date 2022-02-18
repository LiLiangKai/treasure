/*
数组中的逆序对
在数组中的两个数字，如果前面的数字大于后面的数字，则这两个数字构成一对逆序对。
输入一个数组，输出数组中逆序对的总数。
比如 [7, 5, 6, 4] 的逆序对有5个
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function ( nums ) {
  if ( !nums || !nums.length ) return 0
  let count = 0
  for(let i=0; i<nums.length-1; i++) {
    for(let j=i+1; j<nums.length; j++) {
      if(nums[i] > nums[j]) {
        count++
      }
    }
  } 
  return count
};

function reversePairs2 (nums) {
  if(!nums || !nums.length) return 0
  const result = [0]
  mergeSort( nums, result )
  return result[0]
}

function mergeSort(nums = [], result) {
  if(!nums.length) return []
  if(nums.length < 2) return nums
  const mid = nums.length >> 1
  const left = nums.slice(0, mid)
  const right = nums.slice(mid)
  return merge(mergeSort(left, result), mergeSort(right, result), result)
}

function merge(left=[], right=[], result = []) {
  const arr = []
  let i=0, j=0

  while (i<left.length && j<right.length) {
    if(left[i] > right[j]) {
      arr.push(right[j++])
      result[0] += left.length-i
    } else {
      arr.push(left[i++])
    }
  }

  while(i < left.length) {
    arr.push(left[i++])
  }

  while(j < right.length) {
    arr.push(right[j++])
  }
  
  return arr
}

const nums = [100,99,1,101,98,32,33,34,21,88,89,72,59,58,16,102,5,44,49,64,63,62,51,14,15,19,22,31,34,26]

console.time('reversePairs')
console.log(reversePairs(nums))
console.timeEnd( 'reversePairs' )

console.time( 'reversePairs2' )
console.log( reversePairs2( [7,7,6,5,4] ) )
console.timeEnd( 'reversePairs2' )