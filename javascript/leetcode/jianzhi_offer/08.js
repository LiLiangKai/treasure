/*
把一个数组最开始的若干个元素搬到末尾，我们称为数组的旋转，输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。
例如：[3,4,5,1,2]是[1,2,3,4,5]的一个旋转，数组最小元素是1
*/

/**
 * 
 * @param {number[]} nums 
 */
function min (nums) {
  let l = 0
  let r = nums.length-1
  let mid = l
  while(nums[l] >= nums[r]) {
    if(r - l === 1) {
      mid = r
      break
    }
    mid = (l + r) >> 1

    // if(nums[l] === nums[r]) {
    //   return findMinOrder(nums)
    // }

    if(nums[l] <= nums[mid]) {
      l = mid
    } else if(nums[mid] <= nums[r]) {
      r = mid
    }
  }
  return nums[mid]
}

function findMinOrder (nums) {
  let min = nums[0]
  for(let n of nums) {
    min = Math.min(n, min)
  }
  return min
}

console.log( min( [ 3, 4, 5, 1, 2 ] ) )
console.log( min( [ 3, 4, 5, 6, 1, 2, 3 ] ) )
console.log( min( [ 1, 1, 1, 0, 1 ] ) )