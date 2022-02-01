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
  // const dp = new Array(s.length).fill(0)

  
  return 
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

// console.log(longestPalindrome('babad'));
// console.log(longestPalindrome('cbbd'));
// console.log(longestPalindrome('a'));
console.log(longestPalindrome("babaddtattarrattatddetartrateedredividerb"));