/*
n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

输入：n = 4
输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
*/

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function ( n ) {
  const result = []
  const board = new Array( n ).fill( '.'.repeat( n ) )
  backtracking( board, 0, result )
  return result
};

function backtracking ( board, row, result ) {
  if ( row === board.length ) {
    result.push( [...board] )
    return
  }

  const n = board[ row ].length
  for ( let col = 0; col < n; col++ ) {
    if ( !isValid( board, row, col ) ) {
      continue
    }
    const tmp = board[ row ]
    board[ row ] = '.'.repeat(col) + 'Q' + '.'.repeat(n-1-col)
    backtracking( board, row + 1, result )
    board[ row ] = tmp
  }
}

function isValid ( board, row, col ) {
  const rows = board.length

  // 检查同列非同行列情况
  for ( let i=0; i < rows; i++ ) {
    // 同列非同行存在皇后
    if ( board[ i ][ col ] === 'Q') return false
  }


  // 检查左上角
  for(let i=row-1, j=col-1; i>=0 && j>=0; i--,j--) {
    if(board[i][j] === 'Q') return false
  }

  // 检查右上角
  for(let i=row-1, j=col+1; i>=0 && j<rows; i--,j++) {
    if(board[i][j] === 'Q') return false
  }

  return true
}

/*
.Q..
...Q
Q...
..Q.
*/
console.log( solveNQueens(8))


