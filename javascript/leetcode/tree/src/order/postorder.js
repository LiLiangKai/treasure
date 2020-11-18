function TreeNode ( val ) {
  this.elem = val
  this.left = null
  this.right = null
}

/**
 * 二叉树后序遍历
 * 先遍历左子树和右子树，最后遍历根节点
 * @param {TreeNode} treeNode 
 */
function postorder (treeNode) {
  if(!treeNode) return
  postorder(treeNode.left)
  postorder(treeNode.right)
  console.log('postorder current node: ', treeNode.elem)
}

module.exports = postorder