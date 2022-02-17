/*
把数组排成最小的数
输入一个正整数数组，把数组里所有数拼接起来排成一个整数，输出所有能拼接起来的整数中最小的一个。
例如输入 [3,32,321]，输出 321323

示例 1:
输入: [10,2]
输出: "102"

示例 2:
输入: [3,30,34,5,9]
输出: "3033459"

https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/
*/

/**
 * @param {number[]} nums
 * @return {string}
 */
var minNumber = function ( nums ) {
  if(!nums || !nums.length) ''
  return nums.sort( ( a, b ) => ( a + '' + b ) - ( b + '' + a ) ).join('')
}; 

console.log( minNumber( [] ) )
console.log( minNumber( [ 10 ] ) )
console.log( minNumber( [ 10, 2 ] ) )
console.log( minNumber( [ 3, 32, 321 ] ) )
console.log( minNumber( [ 3, 30, 34, 5, 9 ] ) )
console.log( minNumber( [ 3, 0, 34, 0, 9 ] ) )