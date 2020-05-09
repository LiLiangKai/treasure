/*
给定两个非空二叉树 s 和 t，检验 s 中是否包含和 t 具有相同结构和节点值的子树。s 的一个子树包括 s 的一个节点和这个节点的所有子孙。s 也可以看做它自身的一棵子树。

示例 1:
给定的树 s:

     3
    / \
   4   5
  / \
 1   2
给定的树 t：

   4
  / \
 1   2
返回 true，因为 t 与 s 的一个子树拥有相同的结构和节点值。

示例 2:
给定的树 s：

     3
    / \
   4   5
  / \
 1   2
    /
   0
给定的树 t：

   4
  / \
 1   2
返回 false。



来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/subtree-of-another-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode ( val, left, right ) {
  this.val = ( val === undefined ? 0 : val )
  this.left = ( left === undefined ? null : left )
  this.right = ( right === undefined ? null : right )
}

/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSameTree = ( s, t ) => {
  if ( s === null && t === null ) return true
  return s && t && ( s.val === t.val ) && isSameTree( s.left, t.left ) && isSameTree( s.right, t.right )
}

/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function ( s, t ) {
  if(s === null && t === null) return true
  if(s === null || t === null) return false
  return isSameTree(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t)
};



/** 取巧的写法，利用 JSON.stringify */
var isSubtree2 = function ( s, t ) {
  return !!(JSON.stringify(s).indexOf(JSON.stringify(t)) > -1)
}

const s = new TreeNode( 3, new TreeNode(4, new TreeNode(1)), new TreeNode(5, new TreeNode(2)) )
const t = new TreeNode( 3, new TreeNode( 1 ), new TreeNode( 2 ) )
console.log( JSON.stringify(s) )
console.log( JSON.stringify(t) )
console.log( isSubtree( s, t ) )

console.log(isSubtree(
  new TreeNode(1, new TreeNode(1), new TreeNode(2)),
  new TreeNode(1)
))