/*
在一个二维数组中，每一行都是按照从左到右递增的顺序排列，每一列都是按照从上到下的递增顺序排列。
请完成这样一个函数，输入一个二维数组和一个整数，判断二维数组中是否有该整数，返回true或false

例如：
输入：
array = [
  [1, 2, 8, 9],
  [2, 4, 9, 12],
  [4, 7, 10, 13],
  [6, 8, 11, 15]
]
target = 7
输出：true
*/

/**
 * 
 * @param {number[][]} matrix 
 * @param {number} target 
 */
function find (matrix, target) {
  let result = false
  if ( !matrix || !matrix.length) return result
  let rows = 0
  let cols = matrix[0].length - 1

  /*
    根据二维数组的性质
    选取右上角的数字，如果该数字等于target，查找过程结束；
      如果该数字大于target，则该数字所在列都大于target，剔除该列；
      如果该数字小于target，则该数字所在行都小于target，剔除该行
  */
  while(rows < matrix.length && cols >= 0) {
    const n = matrix[rows][cols]
    if (target === n) {
      result = true
      break
    } else if (target < n) {
      cols--
    } else {
      rows++
    }
  }

  return result
}

const matrix = [
  [ 1, 2, 8, 9 ],
  [ 2, 4, 9, 12 ],
  [ 4, 7, 10, 13 ],
  [ 6, 8, 11, 15 ]
]

console.log( find( matrix, 7 ) )
console.log( find( matrix, 0 ) )
console.log( find( [], 0 ) )
console.log( find( matrix, 15 ) )
console.log( find( matrix, 1 ) )