/*
给定一个字符串S，通过将字符串S中的每个字母转变大小写，我们可以获得一个新的字符串。返回所有可能得到的字符串集合。

 

示例：
输入：S = "a1b2"
输出：["a1b2", "a1B2", "A1b2", "A1B2"]

输入：S = "3z4"
输出：["3z4", "3Z4"]

输入：S = "12345"
输出：["12345"]
*/

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function ( s ) {
  const result = []

  function backtrack (start=0, path = []) {
    if(path.length === s.length) {
      result.push(path.join(''))
      return
    }

    for(let i=start; i<s.length; i++) {
      const char = s.charAt(i)
      path.push(char)
      backtrack(i+1, path)
      path.pop()

      if(/[a-zA-Z]/.test(char)) {
        path.push(/[a-z]/.test(char) ? char.toUpperCase() : char.toLowerCase())
        backtrack(i+1, path)
        path.pop()
      }
    }
  }
  backtrack()

  return result
};

console.log( letterCasePermutation('a1b2ca456d'))