function TreeNode ( val ) {
  this.elem = val
  this.left = null
  this.right = null
}

/**
 * 二叉树中序遍历
 * 先遍历左子树，再遍历根节点，最后遍历右子树
 * @param {TreeNode} treeNode
 */
function inorder(treeNode) {
  if(!treeNode) return
  inorder(treeNode.left)
  console.log('inorder current order: ', treeNode.elem)
  inorder(treeNode.right)
}

module.exports = inorder