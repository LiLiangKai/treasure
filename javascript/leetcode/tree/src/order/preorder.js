function TreeNode (val) {
  this.elem = val
  this.left = null
  this.right = null
}

/**
 * 二叉树先序遍历
 * 先遍历根节点，再遍历左子树和右子树
 * @param {TreeNode} treeNode 
 */
function preorder (treeNode) {
  if(!treeNode) return
  console.log('preorder current node: ', treeNode.elem)
  preorder(treeNode.left)
  preorder(treeNode.right)
}

module.exports = preorder