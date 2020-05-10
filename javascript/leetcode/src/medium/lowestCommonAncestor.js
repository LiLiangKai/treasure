/*
给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

例如，给定如下二叉树:  root = [3,5,1,6,2,0,8,null,null,7,4]
         3
       /  \ 
      5    1
     / \  / \
    6  2 0   8
      / \
     7   4
示例 1:

输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
示例 2:

输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。


说明:

所有节点的值都是唯一的。
p、q 为不同节点且均存在于给定的二叉树中。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
function TreeNode ( val ) {
  this.val = val;
  this.left = this.right = null;
}
 
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function ( root, p, q ) {
  

  return root
};

/**
 * 
 * @param {TreeNode} tree 
 * @param {string} suffix
 */
function translate (tree, suffix='') {
  let result = {}
  if(!tree) return result
  let keySuffix = suffix ? `-${ suffix }` : ''
  let key = tree.val + keySuffix
  let left = tree.left ? tree.left.val : null
  let right = tree.right ? tree.right.val : null
  result[key] = { val: tree.val, left, right, level: key.split('-').length }
  return {
    ...result,
    ...translate(tree.left, `${tree.val}l${keySuffix}`),
    ...translate(tree.right, `${tree.val}r${keySuffix}`)
  }
}

// [3,5,1,6,2,0,8,null,null,7,4]
var tree = new TreeNode(3)
tree.left = new TreeNode(5)
tree.right = new TreeNode(1)
l = tree.left
r = tree.right
l.left = new TreeNode(6)
l.right = new TreeNode(2)
r.left = new TreeNode(0)
r.right = new TreeNode(8)
l.right.left = new TreeNode(7)
l.right.right = new TreeNode(4)
console.log(tree)
console.log(translate(tree))

console.log( lowestCommonAncestor( tree, tree.left, l.right.right))