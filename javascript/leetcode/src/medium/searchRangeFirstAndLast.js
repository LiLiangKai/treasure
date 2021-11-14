/*
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

进阶：

你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
 

示例 1：

输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
示例 2：

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
示例 3：

输入：nums = [], target = 0
输出：[-1,-1]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  if(!nums.length) return [-1,-1]
  if(nums.length === 1) {
    const idx = nums[0] === target ? 0 : -1
    return [idx, idx]
  }

  let l = 0
  let r = nums.length-1
  while(l<=r) {
    const mid = (l+r) >> 1
    if(nums[mid] === target) {
      l = r = mid
      while(nums[l-1] === nums[mid]) l--
      while(nums[r+1] === nums[mid]) r++
      return [l,r]
    }
    if(nums[mid] < target) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }
  return [-1, -1]
};

console.log(searchRange([5,7,7,8,8,8,10], 8))
console.log(searchRange([5,7,7,8,8,10], 6))
console.log(searchRange([], 6))