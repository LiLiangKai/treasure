/*
给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案是一个 32-位 整数。

子数组 是数组的连续子序列。

 

示例 1:

输入: nums = [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
示例 2:

输入: nums = [-2,0,-1]
输出: 0
解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-product-subarray
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function ( nums ) {
  if(!nums || !nums.length) return
  const dp = new Array(nums.length).fill(0).map(() => new Array(nums.length).fill(-Infinity))
  dp[0][0] = dp[0][1] = nums[0]
  let result = nums[0]
  for(let i=1; i<nums.length; i++) {
    const n = nums[i]
    dp[i][0] = Math.min(dp[i-1][0]*n, dp[i-1][1]*n, n)
    dp[i][1] = Math.max(dp[i-1][0]*n, dp[i-1][1]*n, n)
    result = Math.max(result, dp[i][0], dp[i][1])
  }
  return result
};

var maxProduct2 = function ( nums ) {
  if(!nums || !nums.length) return
  let prevMin = prevMax = nums[0]
  let result = nums[0]
  for(let i=1; i<nums.length; i++) {
    const n = nums[i]
    const curMin = Math.min(prevMin*n, prevMax*n, n)
    const curMax = Math.max(prevMin*n, prevMax*n, n)
    prevMin = curMin
    prevMax = curMax
    result = Math.max(result, curMax, curMin)
  }
  return result
};

console.log( maxProduct2( [ 2, 3, -2, 4,-2 ] ) )
console.log( maxProduct2( [ -2, 0, -4 ] ) )

/*
    2   3   -2  4
 2  2   
 3  6   3
-2 -12 -6   -2
 4 -48 -24  -8  4
*/
