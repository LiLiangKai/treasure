/*
给定一个非负整数 num。对于 0 ≤ i ≤ num 范围中的每个数字 i ，计算其二进制数中的 1 的数目并将它们作为数组返回。

示例 1:
输入: 2
输出: [0,1,1]

示例 2:
输入: 5
输出: [0,1,1,2,1,2]
*/

/**
 * @param {number} num
 * @return {number[]}
 */
var countBits = function ( num ) {
  const record = new Array(num+1).fill(0)
  for(let i=1; i<=num; i++) {
    record[i] = compute(i)
  }
  return record
};

function compute (num) {
  const bit = parseInt(num).toString(2)
  return bit.split().reduce((count, b) => {
    b === 1 && (count++)
    return count
  }, 0)
}


var countBits2 = function ( num ) {
  const record = new Array( num + 1 ).fill( 0 )
  for ( let i = 1; i <= num; i++ ) {
    if(i%2 === 1) {
      record[i] = record[i-1] + 1
    } else {
      record[i] = record[i/2]
    }
  }
  return record
}
/*
2
0, 1, 2
0  1  10
0  1  1

5
0 1,  2,  3,  4,   5    6      7     8     9     10
0 1  10  11  100  101  110   111  1000  1001    1010
0 1   1   2   1    2    2      3     1     2     2

f(0) = 0
n > 0
n%2 === 1 => f(n) = f(n-1) + 1
n%2 === 0 => f(n) = f(n/2)
*/
