/*
给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。



示例 1：

输入：
    3
   / \
  9  20
    /  \
   15   7
输出：[3, 14.5, 11]
解释：
第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。
*/

/**
 * Definition for a binary tree node.
 */
function TreeNode ( val, left, right ) {
  this.val = ( val === undefined ? 0 : val )
  this.left = ( left === undefined ? null : left )
  this.right = ( right === undefined ? null : right )
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function ( root ) {
  const result = []

  if(!root) return result

  const queue = [root]
  while(queue.length) {
    const length = queue.length
    let levelSum = 0

    for(let i=0; i<length; i++) {
      const node = queue.shift()
      levelSum += node.val
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }

    result.push(levelSum / length)
  }
  
  return result
};

const tree = {
  val: 3,
  left: {
    val: 9
  },
  right: {
    val: 20,
    left: {
      val: 15
    },
    right: {
      val: 7
    }
  }
}

console.log(averageOfLevels(tree))