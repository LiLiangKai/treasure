/*
累加数 是一个字符串，组成它的数字可以形成累加序列。

一个有效的 累加序列 必须 至少 包含 3 个数。除了最开始的两个数以外，序列中的每个后续数字必须是它之前两个数字之和。

给你一个只包含数字 '0'-'9' 的字符串，编写一个算法来判断给定输入是否是 累加数 。如果是，返回 true ；否则，返回 false 。

说明：累加序列里的数，除数字 0 之外，不会 以 0 开头，所以不会出现 1, 2, 03 或者 1, 02, 3 的情况。


示例 1：
输入："112358"
输出：true 
解释：累加序列为: 1, 1, 2, 3, 5, 8 。1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8

示例 2：
输入："199100199"
输出：true 
解释：累加序列为: 1, 99, 100, 199。1 + 99 = 100, 99 + 100 = 199

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/additive-number
*/

/**
 * @param {string} num
 * @return {boolean}
 */
var isAdditiveNumber = function ( num ) {
  const result = []

  function backtrack (start = 0, path = []) {
    console.log('path = ', path)
    if(path.length >= 3) {
      const length = path.length
      if(path[length-1] !== path[length-2] + path[length-3]) return
    }
    if(start === num.length && path.length >= 3 &&  path.join('').length === num.length) {
      result.push([...path])
      return
    }
    for(let i=start; i<num.length; i++) {
      const sub = Number(num.slice(start, i+1))
      path.push(sub)
      backtrack(i+1, path)
      path.pop()
    }
  }

  backtrack()
  console.log(result)
  return result.length > 0
};

// console.log(isAdditiveNumber( '112358' ))
// console.log(isAdditiveNumber( '199100199' ))
// console.log( isAdditiveNumber( '199101199' ) )
// console.log( isAdditiveNumber( '19' ) )
// console.log( isAdditiveNumber( '190' ) )
console.log( isAdditiveNumber( '1203' ) )
// console.log( isAdditiveNumber( '1203' ) )
/*
112358
----------
1
1                                 12              123          1235   12358
2             23 235  2358        3  35  358      5   58       8
3     35 38
5  58
8
----------
*/