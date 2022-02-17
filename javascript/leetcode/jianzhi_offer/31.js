/*
连续子数组的最大和
输入一个整型数组，数组里有正有负。数组中一个或连续多个整数组成一个子数组。求所有子数组的和的最大值，要求时间复杂度为O(n)
*/

/**
 * 
 * @param {Number[]} nums 
 */
function findGreatestSumOfSubArray(nums) {
  if(!nums || !nums.length) return 0
  let recordMaxSum = -Infinity
  let curSum = 0
  for(let i=0; i<nums.length; i++) {
    const n = nums[i]
    if(curSum <= 0) {
      curSum = n
    } else {
      curSum += n
    }
    if(curSum > recordMaxSum) {
      recordMaxSum = curSum
    }
  }  
  return recordMaxSum
}

console.log( findGreatestSumOfSubArray( [] ) )
console.log( findGreatestSumOfSubArray( [-2, -3] ) )
console.log( findGreatestSumOfSubArray( [1, -2, 3, 10, -4, 7, 2, -5] ) )