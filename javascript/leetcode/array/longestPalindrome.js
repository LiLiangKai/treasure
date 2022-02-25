/*
给你一个字符串 s，找到 s 中最长的回文子串。

 

示例 1：
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。

示例 2：
输入：s = "cbbd"
输出："bb"
示例 3：

输入：s = "a"
输出："a"

示例 4：
输入：s = "ac"
输出："a"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-substring
*/

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  if(!s) return ''  
  let result = ''
  for(let i=0; i<s.length; i++) {
    for(let j=i; j<s.length; j++) {
      const sub = s.slice(i, j+1)
      if(isValid(sub) && sub.length > result.length) {
        result = sub
      }
    }
  }
  return result
};

function isValid (s) {
  let l = 0
  let r = s.length-1
  while(l < r) {
    if(s[l] !== s[r]) return false
    l++
    r--
  }
  return true
}

/*

*/

var longestPalindrome2 = function ( s ) {
  if(!s || s.length < 2) return s
  const dp = new Array(s.length).fill(0).map(() => new Array(s.length).fill(false))
  for(let i=0; i<s.length; i++) {
    dp[i][i] = true
  }
  let start = end = 0
  for(let i=0; i<s.length; i++) {
    for(let j=i+1; j<s.length; j++) {
      if(s[i] === s[j]) {
        const length = j - i
        if(length <= 1) {
          dp[ i ][ j ] = dp[ j ][ i ] = true
        } else {
          dp[i][j] = dp[i+1][j-1]
          dp[j][i] = dp[j-1][i+1]
        }
        if(dp[i][j] && length > (end-start)) {
          start = i
          end = j
        }
      }
    }
  }
  return s.slice( start, end + 1 )
}

console.log(longestPalindrome2('babad'));
console.log(longestPalindrome2('cbbd'));
console.log(longestPalindrome2('a'));
console.log(longestPalindrome2("babaddtattarrattatddetartrateedredividerb"));