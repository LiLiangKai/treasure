/*
给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

 

示例 1：

输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"
示例 2：

输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
示例 3：

输入：s = ""
输出：0

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-valid-parentheses
*/

/**
 * @param {string} s
 * @return {number}
 */
 var longestValidParentheses = function(s) {
  if(!s.length) return 0
  let result = 0

  function backtrack (start = 0, path = [], prev=-1) {
      if(path.length >= 2 && isValid(path) && s.indexOf(path.join('')) > -1) {
          result = Math.max(result, path.length)
      }
      if(s.length === start) return
      for(let i=start; i<s.length; i++) {
          const c = s[i]
          path.push(c)
          backtrack(i+1, path, start)
          path.pop()
      }
  }

  backtrack()
  return result
};

function isValid (s) {
  const stack = []
  for(let i=0; i<s.length; i++) {
      const char = s[i]
      if(char === '(') {
          stack.push(char)
      } else if(char === ')') {
          if(stack[stack.length-1] === '(') {
              stack.pop()
          } else {
              stack.push(char)
          }
      }
  }
  return stack.length === 0
}

console.log(longestValidParentheses('(()'));
console.log(longestValidParentheses(''));
console.log(longestValidParentheses(')()())'));
console.log(longestValidParentheses(")()())()()("));