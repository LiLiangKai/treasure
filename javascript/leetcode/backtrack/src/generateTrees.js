/*
给你一个整数 n ，请你生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。可以按 任意顺序 返回答案。

https://leetcode-cn.com/problems/unique-binary-search-trees-ii/
*/

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function ( n ) {
  const result = []

  
  backtrack()

  return result
};

function bfs (roots) {
  const result = []
  for(let i=0; i<roots.length; i++) {
    const root = roots[i]
    const vals = []
    const queue = [root]
    while(queue.length) {
      let size = queue.length
      while(size--) {
        const node = queue.shift()
        vals.push(node.val)
        node.left && queue.push(node.left)
        node.right && queue.push(node.right)
      }
    }
    result.push(vals)
  }
  return result
} 

// console.log( bfs(generateTrees( 1 ) ))
// console.log( bfs(generateTrees( 2 )) )
console.log( generateTrees( 3 ) )