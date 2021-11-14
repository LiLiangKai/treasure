/*
编写一个程序，通过填充空格来解决数独问题。

数独的解法需 遵循如下规则：

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
数独部分空格内已填入了数字，空白格用 '.' 表示。

输入：board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出：[["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]

*/

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function ( board ) {
  backtrack(board, 0)
};

function backtrack (board, row) {
  if(row === board.length) return

  const cols = board[ row ].length
  for ( let col=0; col<cols; col++ ) {
    if(board[row][col] !== '.') continue
    let n = 1
    while(n <= 9) {
      if(!isValid(board, row, col, n)) continue
      board[row][col] = n
      backtrack(board, col===cols-1?row+1:row)
      // board[row][col] = '.'
      n++
    }
  }
}


function isValid(board, row, col, num) {
  const n = board.length

  for(let i=0; i<n; i++) {
    if(board[i][col] === num) return false
    if(board[row][i] === num) return false
  }

  const minRowLimit = Math.floor(row/3) * 3 // 0,3,6
  const maxRowLimit = minRowLimit + 3 // 3,6,9
  const minColLimit = Math.floor(col/3)
  const maxColLimit = minColLimit + 3
  console.log( row, col, minRowLimit, maxRowLimit, minColLimit, maxColLimit)
  return true
}

const board = [
  [ "5", "3", ".", ".", "7", ".", ".", ".", "." ],
  [ "6", ".", ".", "1", "9", "5", ".", ".", "." ],
  [ ".", "9", "8", ".", ".", ".", ".", "6", "." ],
  [ "8", ".", ".", ".", "6", ".", ".", ".", "3" ],
  [ "4", ".", ".", "8", ".", "3", ".", ".", "1" ],
  [ "7", ".", ".", ".", "2", ".", ".", ".", "6" ],
  [ ".", "6", ".", ".", ".", ".", "2", "8", "." ],
  [ ".", ".", ".", "4", "1", "9", ".", ".", "5" ],
  [ ".", ".", ".", ".", "8", ".", ".", "7", "9" ]
]

solveSudoku(board)
console.log(board)