/*
给你一个大小为 m x n 的二进制矩阵 grid 。

岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

岛屿的面积是岛上值为 1 的单元格的数目。

计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

示例 1：
输入：grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]
输出：6

解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
示例 2：
输入：grid = [[0,0,0,0,0,0,0,0]]
输出：0


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/max-area-of-island
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
 var maxAreaOfIsland = function(grid) {
  const rows = grid.length
  const cols = grid[0].length
  console.log(`rows=${rows}, cols=${cols}`);
  let maxArea = 0
  const used = new Map()

  for(let r=0; r<rows; r++) {
      for(let c=0; c<cols; c++) {
          if(grid[r][c] === 0) continue
          if(used.has(`${r}-${c}`)) continue
          const area = computeArea(r, c)
          maxArea = Math.max(maxArea, area)
      }
  }

  function computeArea (r, c) {
      if(grid[r][c] === 0) return 0
      const key = `${r}-${c}}`
      if(used.has(key)) return 0
      let area = 1
      used.set(key, true)
      let tr = r
      while(++tr < rows) {
          if(grid[tr][c] === 0) break
          area += computeArea(tr, c)
      }
      tr = r
      while(--tr>=0) {
        if(grid[tr][c] === 0) break
          area += computeArea(tr, c)
      }
      let tc = c
      while(++tc < cols) {
          if(grid[r][tc] === 0) break
          area += computeArea(r, tc)
      }
      tc = c
      while(--tc >= 0) {
        if(grid[r][tc] === 0) break
        area += computeArea(r, tc)
    }
      return area
  } 

  return maxArea
};

grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]

console.log(maxAreaOfIsland(grid));
