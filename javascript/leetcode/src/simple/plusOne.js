/*
给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1:

输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
示例 2:

输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/plus-one
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function ( digits ) {
  // return (Number(digits.join('')) + 1).toString().split('').map(s => Number(s))
  var lastIndex = digits.length - 1
  while(digits[lastIndex] === 9) {
    if(lastIndex === 0 && digits[lastIndex] === 9) {
      digits[lastIndex] = 0
      digits.unshift(1)
      return digits
    }
    digits[ lastIndex ] = 0
    lastIndex--
  }
  digits[lastIndex] ++
  return digits
};

console.log(plusOne([9]))
console.log(plusOne([9,9]))
console.log(plusOne([1,2,3]))
console.log(plusOne([4,3,2,1]))
console.log(plusOne([9,9,9,9]))
console.log(plusOne([1,9,9]))
console.log(plusOne([1,9,9,3,4,9]))
console.log(plusOne([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]))