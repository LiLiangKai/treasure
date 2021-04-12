function TreeNode (val) {
  this.val = val
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
  console.log('preorder current node: ', treeNode.val)
  preorder(treeNode.left)
  preorder(treeNode.right)
}

function preorderIterate (root) {
  const result = []
  if(!root) return result
  const stack = [root]
  while(stack.length) {
    const node = stack.pop()
    result.push(node.val)
    // 右孩子先入栈，左孩子后入栈，保证左孩子会先遍历
    node.right && stack.push(node.right)
    node.left && stack.push(node.left)
  }
  return result
}

module.exports = preorder