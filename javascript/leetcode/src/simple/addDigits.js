/*
给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。

示例:

输入: 38
输出: 2
解释: 各位相加的过程为：3 + 8 = 11, 1 + 1 = 2。 由于 2 是一位数，所以返回 2。
进阶:
你可以不使用循环或者递归，且在 O(1) 时间复杂度内解决这个问题吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-digits
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * @param {number} num
 * @return {number}
 */
// var addDigits = function ( num ) {
//   var str = num.toString().split('')
//   var sum = str.reduce((sum, s) => (sum += Number(s), sum), 0)
//   if(sum < 10) return sum
//   return addDigits(sum)
// };

var addDigits = function ( num ) {
  if(num < 10) return num
  return num % 9 || 9
};

console.log(addDigits(38))
console.log(addDigits(24))
console.log(addDigits(136))
console.log(addDigits(63))

/*
38 => 3+8=11 => 1+1=2 => 2
24 => 2+4=6 => 6
136 => 1+3+6 => 10 => 1
63 => 6+3=9 => 9
569 => 5+6+9=20 => 2
9875 => 9+8+7+5=29 => 2+9=11 => 1+1=2 => 2
*/
