/*
给你一个整数数组 nums ，数组中共有 n 个整数。132 模式的子序列 由三个整数 nums[i]、nums[j] 和 nums[k] 组成，并同时满足：i < j < k 和 nums[i] < nums[k] < nums[j] 。

如果 nums 中存在 132 模式的子序列 ，返回 true ；否则，返回 false 。

 

示例 1：

输入：nums = [1,2,3,4]
输出：false
解释：序列中不存在 132 模式的子序列。
示例 2：

输入：nums = [3,1,4,2]
输出：true
解释：序列中有 1 个 132 模式的子序列： [1, 4, 2] 。
示例 3：

输入：nums = [-1,3,2,0]
输出：true
解释：序列中有 3 个 132 模式的的子序列：[-1, 3, 2]、[-1, 3, 0] 和 [-1, 2, 0] 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/132-pattern
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern2 = function(nums) {
    if(nums.length < 3) return false
    const stack = []
    let k = -Infinity
    
    for(let i=nums.length-1; i>=0; i--) {
      const n = nums[i]
      if(n < k) return true
      while(stack.length > 0 && stack[stack.length - 1] < n) {
        k = Math.max(k, stack.pop())
      }
      stack.push(n)
    } 

    return false
};

function find132pattern (nums) {
  if(nums.length < 3) return false
  const stack = []
  let k = -Infinity
  for(let i=nums.length-1; i>=0; i--) {
    const n = nums[i]
    if(n < k) return true
    while(stack.length>0 && stack[stack.length-1]<n) {
      k = Math.max(k, stack.pop())
    } 
    stack.push(n)
  }
  return false
}

console.log(find132pattern([1,2,3,4]))
console.log(find132pattern([3,1,4,2]))

/*
2
[2]

4
k = 2
[4]


 */