/*
给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。

返回这三个数的和。

假定每组输入只存在恰好一个解。

 

示例 1：

输入：nums = [-1,2,1,-4], target = 1
输出：2
解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
示例 2：

输入：nums = [0,0,0], target = 1
输出：0

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/3sum-closest
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  let result = Infinity
  nums = nums.sort((a, b) => a-b)
  for(let i=0; i<nums.length-2; i++) {
    const n1 = nums[i]
    let l = i+1
    let r = nums.length-1
    while(l < r) {
      const sum = n1 + nums[l] + nums[r]
      if(sum === target) return sum
      if (Math.abs(sum - target) < Math.abs(result - target)) {
        result = sum
      }
      if(sum > target) {
        r--
      } else {
        l++
      }
    }
  }
  console.log(result);
  return result
}

var threeSumClosest2 = function(nums, target) {
  let result = Infinity

  function backtrack (start = 0, path = []) {
      if(path.length === 3) {
          const sum = path.reduce((sum, n) => (sum += n, sum), 0)
          console.log(path, sum);
          if(Math.abs(target-result) > Math.abs(target-sum)) {
            result = sum
          }
      }
      if(start === nums.length) return

      for(let i=start; i<nums.length; i++) {
          path.push(nums[i])
          backtrack(i+1, path)
          path.pop()
      }
  }
  backtrack()
  console.log(result);
  return result
};



// threeSumClosest([0,2,1,-3], 1) // 0
// threeSumClosest([-1,2,1,-4], 1) // 2
threeSumClosest([3,4,5,5,7], 13) // -13