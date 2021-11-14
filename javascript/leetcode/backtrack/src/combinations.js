/*
给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

你可以按 任何顺序 返回答案。

示例 1：

输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
示例 2：

输入：n = 1, k = 1
输出：[[1]]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combinations
*/

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  if(n <= 0 || k <= 0 || n < k) return []
  const result = []
  combineBacktracking(n, k, result)
  return result
};

function combineBacktracking (n, k, result, path = [], start=0) {
  if(k === path.length) {
    result.push([...path])
    return
  }

  for(let i=1; i<=n; i++) {
    if(i <= start) continue
    path.push(i)
    combineBacktracking(n, k, result, path, i)
    path.pop()
  }
}
// console.log(combine(4, 1))
// console.log(combine(4, 2))
// console.log(combine(4, 3))



/*
给定一个无重复元素的正整数数组 candidates 和一个正整数 target ，找出 candidates 中所有可以使数字和为目标数 target 的唯一组合。

candidates 中的数字可以无限制重复被选取。如果至少一个所选数字数量不同，则两种组合是唯一的。 

对于给定的输入，保证和为 target 的唯一组合数少于 150 个。

示例 1：

输入: candidates = [2,3,6,7], target = 7
输出: [[7],[2,2,3]]
示例 2：

输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum
*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  if(!candidates.length) return []
  const result = []
  combinationSumBacktracking(candidates, target, 0, result)
  return result
};

function combinationSumBacktracking (candidates, target, start, result = [], path = []) {
  if(target < 0) return

  if(0 === target) {
    result.push([...path])
    return
  }

  for(let i=start; i<candidates.length; i++) {
    const n = candidates[i] 
    path.push(n)
    combinationSumBacktracking(candidates, target-n, i, result, path)
    path.pop()
  }
}

// console.log(combinationSum([2,3,6,7], 7))



/*
给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

注意：解集不能包含重复的组合。 

示例 1:

输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum-ii
*/
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  if(!candidates.length || target <= 0) return []
  candidates = candidates.sort((a,b) => a-b)
  const result = []
  combinationSum2Backtracking(candidates, target, result)
  return result
};

function combinationSum2Backtracking (candidates, target, result, path = [], begin = 0) {
  if(target === 0) {
    result.push([...path])
    return 
  }

  for(let i=begin; i<candidates.length; i++) {
    const n = candidates[i]
    if(target-n < 0) break
    if(i>begin && n === candidates[i-1]) continue
    path.push(n)
    combinationSum2Backtracking(candidates, target-n, result, path, i+1)
    path.pop()
  }
}
// console.log(combinationSum2([10,1,2,7,6,1,5], 8))
// console.log(combinationSum2([2,5,2,1,2], 5))


/*
找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

说明：

所有数字都是正整数。
解集不能包含重复的组合。 
示例 1:

输入: k = 3, n = 7
输出: [[1,2,4]]
示例 2:

输入: k = 3, n = 9
输出: [[1,2,6], [1,3,5], [2,3,4]]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum-iii
*/
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
  if(n <= 0 || k <= 0) return []
  const result = []
  combinationSum3Backtracking (k, n, result)
  return result
};

function combinationSum3Backtracking (len, target, result, path = [], begin=0) {
  if(target < 0) return
  if(target === 0 && path.length === len) {
    result.push([...path])
    return
  }

  for(let i=1; i<=9; i++) {
    if(i > target) break
    if(i <= begin) continue
    path.push(i)
    combinationSum3Backtracking(len, target-i, result, path, i)
    path.pop()
  }
}

// console.log(combinationSum3(3, 7))
// console.log(combinationSum3(3, 9))


/*
给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。请你从 nums 中找出并返回总和为 target 的元素组合的个数。

题目数据保证答案符合 32 位整数范围。

示例 1：

输入：nums = [1,2,3], target = 4
输出：7
解释：
所有可能的组合为：
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
请注意，顺序不同的序列被视作不同的组合。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum-iv
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function(nums, target) {
  if(target<0 || !nums.length) return []
  nums = nums.sort((a, b) => a-b)
  const result = []
  combinationSum4Backtracking(nums, target, result)
  return result
};

function combinationSum4Backtracking (nums, target, result, path=[]) {
  if(target === 0) {
    result.push([...path])
    return
  }

  for(let i=0; i<nums.length; i++) {
    const n = nums[i]
    if(target-n < 0) break
    path.push(n)
    combinationSum4Backtracking(nums, target-n, result, path)
    path.pop()
  }
}

var combinationSum4 = function(nums, target) {
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= target; i++) {
        for (const num of nums) {
            if (num <= i) {
                dp[i] += dp[i - num];
            }
        }
    }
    return dp[target];
};
console.log(combinationSum4([1,2,3], 4))
console.log(combinationSum4([3,1,2,4], 4))
console.log(combinationSum4([1,2,4], 32))