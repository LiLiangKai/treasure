/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function ( m, n ) {
  const dp = Array( m ).fill().map( () => Array( n ).fill( 0 ) )
  for ( let i = 1; i < n; i++ ) {
    dp[ 0 ][ i ] = 1
  }
  for ( let i = 1; i < m; i++ ) {
    dp[ i ][ 0 ] = 1
  }
  console.log( dp )
  for ( let i = 1; i < m; i++ ) {
    for ( let j = 1; j < n; j++ ) {
      dp[ i ][ j ] = dp[ i - 1 ][ j ] + dp[ i ][ j - 1 ]
      console.log( `${i}x${j} : ${dp[ i ][ j ]} = ${dp[ i - 1 ][ j ]} + ${dp[ i ][ j - 1 ]}`)
    }
  }
  return dp[ m-1 ][ n-1 ]
};

console.log(uniquePaths(3, 3))

/*
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/unique-paths


输入：m = 3, n = 7
输出：28

输入：m = 3, n = 2
输出：3

dp[i][j]  0<=i<=m && 0<=j<=n
dp[0][0] = 0
dp[1][1] = 1

m * n
0 * 0
[]   =>  0

1 * 1
[1] => 1

1 * 2
[1, 1] => 1

1 * 3
[1, 0, 1]  => 1

2 * 1
[
  [1],
  [1]
]   =>  1

2 * 2
[
  [1, 0],
  [0, 1]
]  =>  2

2 * 3
[
  [1, 0, 0]
  [0, 0, 1]
]  => 3

3 * 1
[
  [1],
  [0],
  [1]
]   =>  1

3 * 2
[
  [1, 0],
  [0, 0],
  [0, 1]
]   => 3

3 * 3
[
  [1, 0, 0],
  [0, 0, 0],
  [0, 0, 1]
]  => 6

dp[i][j] = dp[i-1][j] + dp[i][j-1]
dp[1][1] = 1
dp[2][2] = dp[1][2] + dp[2][1] = 1 + 1 = 2
dp[2][3] = dp[1][2] + dp[2][2] =  1 + 2 = 3
*/
