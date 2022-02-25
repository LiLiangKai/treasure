/*
给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。

 

示例 1：

输入：n = 12
输出：3 
解释：12 = 4 + 4 + 4
示例 2：

输入：n = 13
输出：2
解释：13 = 4 + 9

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/perfect-squares
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/*
1  => 1
2  => 2   1+1
3  => 3   1+1+1
4  => 1   4
5  => 2   4+1
6  => 3   4+1+1
7  => 4   4+1+1+1
8  => 2   4+4
9  => 1   9
*/

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function ( n ) {
  const dp = new Array(n+1).fill(0)
  for(let i=1; i<=n; i++) {
    dp[i] = i
    for(let j=1; i-j*j >= 0; j++) {
      dp[i] = Math.min(dp[i], dp[i-j*j]+1)
    }
  }
  return dp[n]
};

console.log( numSquares( 1 ) )
console.log( numSquares( 2 ) )
console.log( numSquares( 3 ) )
console.log( numSquares( 4 ) )
console.log( numSquares( 5 ) )
console.log( numSquares( 6 ) )
console.log( numSquares( 9 ) )
console.log( numSquares( 12 ) )
console.log( numSquares( 16 ) )