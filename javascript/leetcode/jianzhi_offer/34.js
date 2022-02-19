/*
丑数
把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。
https://leetcode-cn.com/problems/chou-shu-lcof/
*/

/**
 * @param {number} n
 * @return {number}
 */
 var nthUglyNumber = function(n) {
  if(!n) return 0
  let i = 0
  while(n) {
    i++
    if(isUgly(i)) {
      n--
    }
  }
  return i
}; 

function isUgly (number) {
  while (number%2 === 0) {
    number /= 2
  }
  while (number%3 === 0) {
    number /= 3
  }
  while (number%5 === 0) {
    number /= 5
  }
  return number === 1
}

// console.log(nthUglyNumber(1));
console.log(nthUglyNumber(10));
// console.log(nthUglyNumber(1659));