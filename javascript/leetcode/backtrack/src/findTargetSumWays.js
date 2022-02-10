/*
给你一个整数数组 nums 和一个整数 target 。

向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：

例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

 

示例 1：

输入：nums = [1,1,1,1,1], target = 3
输出：5
解释：一共有 5 种方法让最终目标和为 3 。
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
示例 2：

输入：nums = [1], target = 1
输出：1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/target-sum
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function ( nums, target ) {
  const result = []
  const list = ['-', '+']

  if(nums.every(n => n===target)) {
    if ( target === 0 ) return 2 ** nums.length
    if(nums.length%2 === 0) return 0
  }

  function backtrack (start=0, sum = 0, path=[]) {
    if (start === nums.length) {
      if(sum === target) {
        console.log(path)
        result.push([...path])
      }
      return
    }

    for(let i=0; i<list.length; i++) {
      const o = list[i]
      path.push(o)
      backtrack( start + 1, (o === '-' ? sum - nums[ start ] : sum + nums[ start ]), path)
      path.pop()
    }
  }

  backtrack()
  
  return result.length
};

// console.log( findTargetSumWays( [ 1, 1, 1, 1, 1 ], 3 ) )
// console.log( findTargetSumWays( [ 1 ], 3 ) )
// console.log( findTargetSumWays( [], 3 ) )
// console.log( findTargetSumWays( [], 3 ) )
console.time('f')
// console.log( findTargetSumWays( [ 1 ], 1 ) )
// console.log( findTargetSumWays( [ 1, 1 ], 1 ) )
console.log( findTargetSumWays( [ 1, 1, 1, 1, 1 ], 3 ) )
console.timeEnd( 'f' )