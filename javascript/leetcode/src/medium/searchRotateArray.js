/*
整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

 

示例 1：

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
示例 2：

输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
示例 3：

输入：nums = [1], target = 0
输出：-1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/search-in-rotated-sorted-array
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if(!nums.length) return -1
    if(nums.length === 1) return nums[0] === target ? 0 : -1
    let l = 0
    let r = nums.length-1

    while(l<=r) {
      const mid = (l+r) >> 1
      if(nums[mid] === target) return mid
      if(nums[0] <= nums[mid]) {
        if(nums[0] <= target && target < nums[mid]) {
          r = mid-1
        } else {
          l = mid+1
        }
      } else {
        if(nums[mid] < target && target <= nums[r]) {
          l = mid+1
        } else {
          r = mid-1
        }
      }
    }
    return -1
};
console.log(search([4,5,6,7,0,1,2],0))
console.log(search([4,5,6,7,0,1,2],2))
console.log(search([-1],0))

/*

[7,0,1,2,3,4,5,6]

[4,5,6,7,0,1,2]
mid = 7


*/