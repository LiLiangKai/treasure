/*
给定一个二维网格和一个单词，找出该单词是否存在于网格中。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。



示例:

board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

给定 word = "ABCCED", 返回 true
给定 word = "SEE", 返回 true
给定 word = "ABCB", 返回 false


提示：

board 和 word 中只包含大写和小写英文字母。
1 <= board.length <= 200
1 <= board[i].length <= 200
1 <= word.length <= 10^3

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/word-search
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function ( board, word ) {
  if(!board.length) return false
  if(!word) return true
  let idx = 0
  const maybeStart = []
  for(let row=0; row<board.length; row++) {
    const bd = board[row]
    for(let col=0; col<bd.length; col++) {
      if(bd[col] === word[idx]) {
        maybeStart.push([row, col])
      }
    }
  }
  for(let i=0; i<maybeStart.length; i++) {
    
  }
  console.log(maybeStart)
};

function getAroundNumber (board, row, col) {
  if(!board[row]) return {}
  const prevRow = row - 1
  const nextRow = row + 1
  const prevCol = col - 1
  const nextCol = col + 1
  return {
    top: board[ prevRow ] ? {num: board[ prevRow ][col], row: prevRow, col} : undefined,
    right: board[row][nextCol] ? {num: board[row][nextCol], row, col: nextCol} : undefined,
    bottom: board[nextRow] ? {num: board[nextRow][col], row: nextRow, col} : undefined,
    left: board[row][prevCol] ? {num: board[row][prevCol], row, col: prevCol} : undefined,
    current: board[row][col] ? {num: board[row][col], row, col} : undefined
  }
}

const board = [
  [ 'A', 'B', 'C', 'E' ],
  [ 'S', 'F', 'C', 'S' ],
  [ 'A', 'D', 'E', 'E' ]
]

console.log(exist(board, 'ABCCED'))