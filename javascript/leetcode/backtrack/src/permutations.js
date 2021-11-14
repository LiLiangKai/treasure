/*
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

 

示例 1：

输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
示例 2：

输入：nums = [0,1]
输出：[[0,1],[1,0]]
示例 3：

输入：nums = [1]
输出：[[1]]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/permutations
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  if(!nums.length) return []
  if(nums.length === 1) return [nums]
  const result = []
  dfs(nums, 0, result)
  return result
};

function dfs (nums = [], depth = 0, result = [], paths = [], used = new Map() ) {
  const len = nums.length
  if(len === depth) {
    result.push([...paths])
    return
  }

  for(let i=0; i<len; i++) {
    if(used.has(i)) continue
    paths.push(nums[i])
    used.set(i, true)

    dfs(nums, depth+1, result, paths, used)
    
    paths.pop()
    used.delete(i)
  }
}

console.log(permute([1,2,3]))
console.log(permute([1,1,3]))
/*
         []
    1    2    3
  2  3  1 3  2  1
  3  2  3 1  1  2
*/

/*
void backtracking(参数) {
  if (终止条件) {
    存放结果;
    return;
  }

  for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
    处理节点;
    backtracking(路径，选择列表); // 递归
    回溯，撤销处理结果
  }
}
*/


// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  if(!nums.length) return []
  if(nums.length === 1) return [nums]
  const result = []
  permuteUniqueBacktracking(nums, result, 0)
  return result
};

function permuteUniqueBacktracking (nums = [], result = [], depth = 0, paths = [], used = new Map()) {
  const len = nums.length
  if(depth === len) {
    const key = paths.join('-')
    if(used.has(key)) return
    used.set(key, true)
    return result.push([...paths])
  }

  for(let i=0; i<len; i++) {
    if(used.has(i)) continue
    paths.push(nums[i])
    used.set(i, true)
    permuteUniqueBacktracking(nums, result, depth+1, paths, used)
    paths.pop()
    used.delete(i)
  }
}

console.log(permuteUnique([1,2,3]))
console.log(permuteUnique([1,1,2]))