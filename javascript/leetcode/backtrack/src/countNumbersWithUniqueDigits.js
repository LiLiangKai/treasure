/*
给定一个非负整数 n，计算各位数字都不同的数字 x 的个数，其中 0 ≤ x < 10^n 。

示例:

输入: 2
输出: 91 
解释: 答案应为除去 11,22,33,44,55,66,77,88,99 外，在 [0,100) 区间内的所有数字。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/count-numbers-with-unique-digits
*/

/**
 * @param {number} n
 * @return {number}
 */
var countNumbersWithUniqueDigits = function ( n ) {
  const result = []
  
  function backtrack (start = 0, path=[]) {
    if(start === n) {
      result.push([...path])
      return
    }
    
  }

  backtrack()
  console.log(result.length)
  return result
};

console.log(countNumbersWithUniqueDigits(3))
// console.log(countNumbersWithUniqueDigits(3))

/*
2 => 91
3 => 739
4 => 5275
5 => 32491
*/
