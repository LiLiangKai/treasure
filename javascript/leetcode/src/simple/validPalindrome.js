/*
真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

示例 1:
输入: "aba"
输出: True
示例 2:
输入: "abca"
输出: True
解释: 你可以删除c字符。
注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
*/

function validPalindrome (str) {
  const length = str.length
  let left = 0
  let right = length - 1
  while(left < right) {
    if(str[left++] === str[right--]) continue
    else break
  }

  if(isPalindrome(left+1, right)) return true
  if(isPalindrome(left, right-1)) return true

  function isPalindrome(lt, rt) {
    while(lt < rt) {
      if(str[lt++] !== str[rt--]) {
        return false
      }
    }
    return true
  }

  return false
}

console.log( validPalindrome( 'abc' ) )
console.log( validPalindrome( 'aba' ) )
console.log( validPalindrome( 'abacwd' ) )
console.log( validPalindrome( '124231' ) )