/*
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

输入: ["flower","flow","flight"]
输出: "fl"
示例 2:

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-common-prefix
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function ( strs ) {
  let prefix = ''
  if(!strs || !strs.length) return prefix
  if(strs.length === 1) return strs[0]
  if(strs.some(str => str === '')) return ''
  const [first, ...others] = strs
  let idx = 1
  prefix = first.slice( 0, idx )
  let flag = others.some( ( str ) => str.indexOf( prefix ) !== 0 )
  if(flag) return ''
  while(!flag) {
    idx++
    prefix = first.slice( 0, idx )
    flag = others.some( ( str ) => str.indexOf( prefix ) !== 0 )
    if(flag) {
      prefix = first.slice( 0, idx-1 )
      break
    }
    if ( idx >= first.length ) break
  }
  return prefix
};

console.log(longestCommonPrefix(['','']))
console.log(longestCommonPrefix(['cc', 'cc','cc']))
console.log(longestCommonPrefix(['dog']))
console.log(longestCommonPrefix(["flower","flow","flight"]))
console.log(longestCommonPrefix(["dog","racecar","car"]))
console.log(longestCommonPrefix(['abce', 'abck', 'abcd', 'ac']))