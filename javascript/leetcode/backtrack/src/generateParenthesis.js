/*
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

示例 1：
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]

示例 2：
输入：n = 1
输出：["()"]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/generate-parentheses
*/

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function ( n ) {
  const result = []
  const chars = ['(', ')']

  function backtrack (left=n, right=n, path=[]) {
    if(!left && !right) {
      result.push(path.join( '' ))
      return
    }
    for(let i=0; i<chars.length; i++) {
      const char = chars[i]
      if (char === '(') {
        if(left === 0) continue
        path.push(char)
        left--
        backtrack(left, right, path)
        left++
        path.pop()
      } else {
        if(right === 0 || left >= right) continue
        path.push( char )
        right--
        backtrack( left, right, path )
        right++
        path.pop()
      }
    }
  }

  backtrack()

  return result
};

console.log( generateParenthesis(1))
console.log( generateParenthesis(2))
console.log( generateParenthesis(3))
console.log( generateParenthesis(4))