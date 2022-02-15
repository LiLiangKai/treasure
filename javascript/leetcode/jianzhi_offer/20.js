/*
输入一个矩阵，按照从外向里以顺时针的顺序打印出矩阵的每个元素。例如：
1   2  3  4
5   6  7  8
9  10 11 12
13 14 15 16
输出：1、2、3、4、8、12、16、15、14、13、9、5、6、7、11、10
*/ 

/**
 * 
 * @param {Number[][]} matrix 
 */
function printMatrix (matrix = []) {
  if(!matrix.length) return
  const rows = matrix.length
  if(rows <= 0) return
  const colums = matrix[0].length
  if(colums <= 0) return

  let start = 0
  const result = []
  while(rows > start<<1 && colums > start<<1) {
    getElementInCircle(start, result)
    start++
  }

  function getElementInCircle (start = 0, result = []) {
    const endX = rows - 1 - start
    const endY = colums - 1 - start
    
    // 从左到右
    for(let i=start; i<=endX; i++) {
      result.push(matrix[start][i])
    }

    // 从上到下，要求终止行号大于起始行号，即至少有两行
    if(start < endY) {
      for(let i=start+1; i<=endY; i++) {
        result.push(matrix[i][endX])
      }
    }

    // 从右到左，要求终止列号大于起始列号，且终止行号大于起始行号，即至少两行两列
    if(start<endX && start<endY) {
      for(let i=endX-1; i>=start; i--) {
        result.push(matrix[endY][i])
      }
    }

    // 从下到上，要求终止列号大于起始列号，且终止行号至少比起始行号大2，即至少有三行两列
    if(start<endX && start<endY-1) {
      for(let i=endY-1; i>start; i--) {
        result.push(matrix[i][start])
      }
    }
  }

  return result
}

const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
]

console.log( printMatrix( [] ) )
console.log( printMatrix( [ [] ] ) )
console.log( printMatrix( matrix ) )