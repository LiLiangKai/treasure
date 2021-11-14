/*
给你一个正整数 n ，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
例如：3
1  2  3
8  9  4
7  6  5

例如：4
1   2  3  4
12 13 14  5
11 16 15  6
10  9  8  7

*/

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function ( n ) {
  const result = Array.from({length: n}).map(() => new Array(n))
  let start = 1
  let level = n >> 1
  let count = 1
  let startX = startY = 0
  while(start <= level) {
    let row = startX
    let col = startY

    while(col < n-start) {
      result[row][col++] = count++
    }

    while(row < n-start) {
      result[row++][col] = count++
    }

    while(col > startY) {
      result[row][col--] = count++
    }

    while(row > startX) {
      result[row--][col] = count++
    }
    
    startX = ++startY
    start++
  }

  if(n&1) {
    result[startX][startY] = count
  }

  return result
};

console.log(generateMatrix(5))