/*
输入一个数值数组，调整数组中数值的顺序，使所有奇数显示在数组的前面，所有偶数显示在数组的后面
*/

/**
 * 
 * @param {Number[]} nums 
 */
function reorderArray (nums, fn) {
  if(!nums.length) return nums
  fn = typeof fn === 'function' ? fn : isEven

  let l = 0
  let r = nums.length - 1

  while(l < r) {
    while(l < r && !fn(nums[l])) l++
    while(l < r && fn(nums[r])) r--

    if(l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]]
    }
  }

  return nums
}

function isEven (n) {
  return n%2 === 0
}

console.log( reorderArray( [], isEven ) )
console.log( reorderArray( [ 1, 2, 3, 4, 5 ], isEven ) )
console.log( reorderArray( [ 1, 3, 5, 4, 6, 8 ], isEven ) )
console.log( reorderArray( [ 4, 6, 8, 1, 3, 5 ], isEven ) )
console.log( reorderArray( [ 2, 1, 4, 5, 3, 6, 6, 7, 9, 10 ], isEven ) )
