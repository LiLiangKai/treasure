/*
给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] ：

0 <= a, b, c, d < n
a、b、c 和 d 互不相同
nums[a] + nums[b] + nums[c] + nums[d] == target
你可以按 任意顺序 返回答案 。



示例 1：

输入：nums = [1,0,-1,0,-2,2], target = 0
输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
示例 2：

输入：nums = [2,2,2,2,2], target = 8
输出：[[2,2,2,2]]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/4sum
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function ( nums, target ) {
  nums = nums.sort( ( a, b ) => a - b )
  const result = []
  const length = nums.length
  for ( let i = 0; i < length - 3; i++ ) {
    if ( i > 0 && nums[ i ] === nums[ i - 1 ] ) continue

    for ( let j = i + 1; j < length - 2; j++ ) {
      if ( j > i + 1 && nums[ j ] === nums[ j - 1 ] ) continue

      let l = j + 1
      let r = length - 1
      while ( l < r ) {
        const sum = nums[ i ] + nums[ j ] + nums[ l ] + nums[ r ]
        if(sum < target) l++
        else if(sum > target) r--
        else {
          result.push( [ nums[ i ], nums[ j ], nums[ l ], nums[ r ] ] )
          while ( l < r && nums[ l ] === nums[ ++l ] ) {}
          while ( l < r && nums[ r ] === nums[ --r ] ) {}
        }
      }
    }
  }
  return result
};

console.log( fourSum([ 1, 0, -1, 0, -2, 2 ], 0))