/*
数字在排序数组中出现的次数
统计一个数字在排序数组中出现的次数。例如输入[1,2,3,3,3,3,4,5]中3出现的次数，输出4
*/

/**
 * 
 * @param {Number[]} nums 
 * @param {*} k 
 */
function getNumberOfK (nums = [], k) {
  if(!nums.length) return 0
  let l = 0, r = nums.length-1
  while(l <= r) {
    const mid = (l + r) >> 1
    if(nums[mid] > k) {
      r = mid - 1
    } else if(nums[mid] < k) {
      l = mid+1
    } else {
      let count = 1
      l = mid - 1
      r = mid + 1
      while ( nums[ l-- ] === k )  count++
      while ( nums[ r++ ] === k ) count++
      return count
    }
  }
  return 0
}

console.log( getNumberOfK( [ 1, 2, 3, 3, 3, 3, 4, 5 ], 3 ) )
console.log( getNumberOfK( [ 1, 2, 3, 3, 3, 3, 4, 5 ], 4 ) )
console.log( getNumberOfK( [  ], 4 ) )