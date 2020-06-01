/*
给你两个二进制字符串，返回它们的和（用二进制表示）。

输入为 非空 字符串且只包含数字 1 和 0。



示例 1:

输入: a = "11", b = "1"
输出: "100"
示例 2:

输入: a = "1010", b = "1011"
输出: "10101"


提示：

每个字符串仅由字符 '0' 或 '1' 组成。
1 <= a.length, b.length <= 10^4
字符串如果不是 "0" ，就都不含前导零。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-binary
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function ( a, b ) {
  var maxLength = Math.max(a.length, b.length)
  var sum = ''
  var carry = 0
  a = a.padStart(maxLength, '0')
  b = b.padStart(maxLength, '0')
  for(let i=a.length-1; i>=0; i--) {
    if(a[i] === '1' && b[i] === '1') {
      sum = carry + sum
      carry = 1
    } else if(a[i] === '0' && b[i] === '0') {
      sum = carry + sum
      carry = 0
    } else {
      var isCarry = carry + 1 === 2 ? 0 : 1
      sum = isCarry + sum
      carry = 1 - isCarry
    }
  }
  if(carry === 1) {
    sum = 1 + sum
  }
  return sum
}; 

var addBinary2 = function(a, b) {
  return ( BigInt( '0b' + a ) + BigInt( '0b' + b ) ).toString( 2 )
}

// console.log(addBinary('11', '1'))
// console.log(addBinary('1101', '10'))
console.log( addBinary( "1010", "1011"))
/*

a = '1010'
b = '1011'
sum = ''
carry = 0

---------
isCarry = 0+1 === 2 ? 0 : 1 = 1
sum = 1 + '' = '1'
carray = 0
---------
sum = carray + sum = 0 + '1' = '01'
carry = 1
---------
sum = carry + sum = 1 + '01' = '101'
carry = 0
---------
sum = carry + sum = 0 + '101' = '0101'
carry = 1
---------
carry === 1 && sum = 1 + sum = 1 + '0101' = '10101'

*/