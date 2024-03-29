/*
缺失的第一个正数
给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。


示例 1：
输入：nums = [1,2,0]
输出：3

示例 2：
输入：nums = [3,4,-1,1]
输出：2

示例 3：
输入：nums = [7,8,9,11,12]
输出：1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/first-missing-positive
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function ( nums ) {
  let result = 1
  if(!nums) return result
  nums = nums.sort((a, b) => a-b)
  for(let i=0; i<nums.length; i++) {
    const n = nums[i]
    if(n === result) result++
    else if(n < result) continue
    else break
  }
  return result
};

console.log( firstMissingPositive( [ 0, 2, 1 ] ) )
console.log( firstMissingPositive( [ 3, 4, -1, 1 ] ) )
console.log( firstMissingPositive( [ 7, 8, 9, 11, 12 ] ) )
console.log( firstMissingPositive( [ 1, 7, 8, 9, 11, 12 ] ) )