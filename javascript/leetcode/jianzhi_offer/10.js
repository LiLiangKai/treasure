/*
请实现一个函数，输入一个整数，输出该整数二进制表示中1的格式。
例如输入9，9的二进制表示是1001，输出2

1001
1000 => 1000

1000
0111 => 0000
*/

function numberOf1 (n) {
  let count = 0
  while(n) {
    count++
    // 将数n与其减1后的数相与，数n的二进制表示中靠近右边的第一个1及其之后的位都变为0，其之前的位保持不变。
    n = (n-1) & n
  }
  return count
}

console.log( numberOf1( 1 ) )
console.log( numberOf1( 3 ) )
console.log( numberOf1( 9 ) )
console.log( numberOf1( -10 ) )
console.log( numberOf1( 10 ) )
