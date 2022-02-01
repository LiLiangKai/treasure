/*
当一个字符串 s 包含的每一种字母的大写和小写形式 同时 出现在 s 中，就称这个字符串 s 是 美好 字符串。比方说，"abABB" 是美好字符串，因为 'A' 和 'a' 同时出现了，且 'B' 和 'b' 也同时出现了。然而，"abA" 不是美好字符串因为 'b' 出现了，而 'B' 没有出现。

给你一个字符串 s ，请你返回 s 最长的 美好子字符串 。如果有多个答案，请你返回 最早 出现的一个。如果不存在美好子字符串，请你返回一个空字符串。

 

示例 1：

输入：s = "YazaAay"
输出："aAa"
解释："aAa" 是一个美好字符串，因为这个子串中仅含一种字母，其小写形式 'a' 和大写形式 'A' 也同时出现了。
"aAa" 是最长的美好子字符串。
示例 2：

输入：s = "Bb"
输出："Bb"
解释："Bb" 是美好字符串，因为 'B' 和 'b' 都出现了。整个字符串也是原字符串的子字符串。
示例 3：

输入：s = "c"
输出：""
解释：没有美好子字符串。
示例 4：

输入：s = "dDzeE"
输出："dD"
解释："dD" 和 "eE" 都是最长美好子字符串。
由于有多个美好子字符串，返回 "dD" ，因为它出现得最早。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-nice-substring
*/
/**
 * @param {string} s
 * @return {string}
 */
var longestNiceSubstring = function(s) {
  let result = ''

  for(let i=0; i<s.length; i++) {
    for(let j=i+1; j<=s.length; j++) {
      const sub = s.slice(i, j)
      if(!isValid(sub)) continue
      console.log(sub);
      sub.length > result.length && (result = sub)
    }
  }

  return result
}

var longestNiceSubstring2 = function(s) {
  let result = ''

  function backtrack (start = 0, path = [], prev) {
    // console.log(start, prev, path);
    const sub = path.join('')
      if(s.indexOf(sub) > -1 && isValid(sub) && sub.length > result.length) {
        result = sub
      }
      if(start === s.length) return

      for(let i=start; i<s.length; i++) {
          const char = s[i]
          path.push(char)
          backtrack(i+1, path, i)
          path.pop()
      }
  }

  backtrack()
  return result
};



/**
* @param {string} s
*/
function isValid (s) {
  if(!s) return true
  const map = {}
  for(let i=0; i<s.length; i++) {
    const char = s[i]
    map[char] = char
  }
  for(let char of s) {
    const upper = char.toUpperCase()
    const lower = char.toLowerCase()
    if(map[upper] && map[lower]) continue
    return false
  }
  return true
}

// console.log(isValid('YazaAay'));
// console.log(isValid('Bb'));
// console.log(isValid('dDzeE'));

// console.log(longestNiceSubstring('YazaAay'));
// console.log(longestNiceSubstring('Bb'));
// console.log(longestNiceSubstring('dDzeE'));
console.log(longestNiceSubstring("xLeElzxgHzcWslEdgMGwEOZCXwwDMwcEhgJHLL"));