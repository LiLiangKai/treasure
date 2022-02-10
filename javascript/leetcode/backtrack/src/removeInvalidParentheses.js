/*
给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。

返回所有可能的结果。答案可以按 任意顺序 返回。

示例 1：
输入：s = "()())()"
输出：["(())()","()()()"]

示例 2：
输入：s = "(a)())()"
输出：["(a())()","(a)()()"]

示例 3：
输入：s = ")("
输出：[""]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-invalid-parentheses
*/

/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function ( s ) {
  const result = {}
  const chars = s.split('')

  function backtrack (start=0, path=[]) {
    if(start === chars.length) {
      if(isValid(path)) {
        const k = path.join('')
        result[k] = k
      }
      return
    }
    
    for(let i=start; i<chars.length; i++) {
      const char = chars[i]
      if(char!=='(' && char!==')') {
        path.push(char)
        continue
      }
      path.push(char)
      backtrack(i+1, path)
      path.pop()
    }
  }
  backtrack( 0)
  return Object.keys(result)
};

function isValid (chars) {
  const stack = []
  for(let i=0; i<chars.length; i++) {
    const char = chars[i]
    if(char === '(') {
      stack.push(char)
    } else if(char === ')') {
      const t = stack[stack.length-1]
      if(t === '(') {
        stack.pop()
      } else {
        stack.push(char)
      }
    }
  }
  return !stack.length
}

console.log(removeInvalidParentheses('()())()'))
console.log(removeInvalidParentheses('(a)())()'))
console.log( removeInvalidParentheses( ')(' ) )
console.log( removeInvalidParentheses( '))(' ) )
console.log( removeInvalidParentheses( ')())(' ) )